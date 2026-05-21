import os
import sqlite3
import json
import time
from datetime import datetime
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# --- CONFIGURATION ---
SUBREDDITS = [
    'macapps', 'MacOS', 'productivity', 'shortcuts', 'Raycast', 'alfred', 
    'KeyboardMaestro', 'ProductivityApps', 'automation', 'workflow', 'selfhosted', 
    'ObsidianMD', 'macOSbeta', 'apple', 'software', 'SideProject', 'SaaS', 
    'artificial', 'LocalLLaMA', 'developersIndia', 'studying', 'WomenInBusiness', 
    'VoiceAIAgent', 'AIDiscussion', 'AIToolCompare', 'PhDProductivity', 
    'gradschool', 'LawSchool', 'MedSchool', 'FemaleFounders', 'Mompreneurs', 
    'WorkingMom', 'AI_Agents', 'AI_Automations', 'ADHD_Programmers', 
    'ADHDproductivity', 'DeepWork', 'SecondBrain', 'OpenAI', 'ChatGPT', 
    'ClaudeAI', 'GenerativeAI', 'College', 'GetStudying', 'University', 
    'voicechat', 'RemoteWork', 'Freelance', 'Solopreneur', 'Entrepreneur', 
    'Startups', 'VoiceChat', 'AI_Voice_Generators', 'ElevenLabs', 
    'AIConversations', 'homeworkhelp', 'studyips', 'WorkFromHome'
]

EXCLUDE_SELF_PROMO = True
SELF_PROMO_SUBREDDITS = [
    'sideproject', 'saas', 'entrepreneur', 'startups', 'indiehackers', 
    'microsaas', 'startupideas', 'solopreneur', 'aitoolcompare', 
    'ai_automations', 'ai_agents', 'selfhosted', 'startupindia', 
    'indianstartups', 'freelance'
]

if EXCLUDE_SELF_PROMO:
    SUBREDDITS = [sub for sub in SUBREDDITS if sub.lower() not in SELF_PROMO_SUBREDDITS]

DB_PATH = 'invoko_leads.db'
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')

# --- DATABASE LAYER ---
class Database:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                id TEXT PRIMARY KEY,
                subreddit TEXT,
                title TEXT,
                author TEXT,
                url TEXT,
                content TEXT,
                score REAL,
                relevance_score INTEGER,
                pain_point_score INTEGER,
                emotion_score INTEGER,
                draft_reply TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                processed INTEGER DEFAULT 0
            )
        ''')
        self.conn.commit()

    def is_seen(self, post_id):
        cursor = self.conn.cursor()
        cursor.execute('SELECT id FROM leads WHERE id = ?', (post_id,))
        return cursor.fetchone() is not None

    def insert_lead(self, lead_data):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO leads (id, subreddit, title, author, url, content, score, relevance_score, pain_point_score, emotion_score, draft_reply)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            lead_data['id'], lead_data['subreddit'], lead_data['title'], lead_data['author'],
            lead_data['url'], lead_data['content'], lead_data['score'], 
            lead_data['relevance_score'], lead_data['pain_point_score'], lead_data['emotion_score'],
            lead_data['draft_reply']
        ))
        self.conn.commit()

# --- AI LAYER (OpenRouter) ---
class AIService:
    def __init__(self):
        self.api_key = OPENROUTER_API_KEY
    
    def analyze_post(self, title, content, subreddit):
        if not self.api_key:
            print("ERROR: Missing OPENROUTER_API_KEY")
            return None

        prompt = f"""
        You are a lead qualification agent for Invoko.ai.
        Analyze the following Reddit post for sales potential.
        
        Subreddit: r/{subreddit}
        Title: {title}
        Content: {content}
        
        QUALIFICATION CRITERIA:
        1. Relevance (0-10): Is this about Mac workflow, app-switching friction, productivity bottlenecks, or AI context?
        2. Pain Point (0-10): Is the user expressing a specific, hard technical or operational hurdle?
        3. Emotion (0-10): Is the user frustrated, annoyed, or actively seeking a better way?
        
        STRICT REPLY RULES (FOR "draft_reply"):
        - NO DASHES (— or -) allowed.
        - NO FORMAL SENTENCES. NO "I HAVE FOUND".
        - LOWERCASE ONLY.
        - USE FRAGMENTS.
        - USE REDDIT SLANG (tbh, idk, literally, bs, lowkey, fr, slop).
        - THE "TROJAN HORSE": Subtly tie their problem back to the technical complexity you faced building **Invoko**.
        
        OUTPUT FORMAT: JSON ONLY
        {{
            "relevance": integer,
            "pain": integer,
            "emotion": integer,
            "justification": "short string",
            "draft_reply": "lowercase fragment only. e.g. 'yeah the whole [topic] thing is mostly bs right now tbh. it is good at [action] but real [goal] involves [complex thing] which generic models just do not do. you are gonna hit a wall trying to make a basic [tool] truly [benefit]. we have run into similar issues building out stuff like invoko where the nuance of understanding user intent from context is everything. if you are serious about the technical backend for actual [feature] not just surface level stuff hit my inbox.'"
        }}
        """
        
        try:
            res = requests.post(
                'https://openrouter.ai/api/v1/chat/completions',
                headers={
                    'Authorization': f'Bearer {self.api_key}',
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://invoko.ai', # Optional but good for OpenRouter
                    'X-Title': 'Invoko Lead Scraper'
                },
                json={
                    'model': 'google/gemini-2.0-flash-001', # Using Gemini via OpenRouter
                    'messages': [{'role': 'user', 'content': prompt}],
                    'response_format': {'type': 'json_object'}
                }
            )
            data = res.json()
            if 'choices' in data:
                return self._parse_json(data['choices'][0]['message']['content'])
            else:
                print(f"OpenRouter Error: {data}")
                return None
        except Exception as e:
            print(f"OpenRouter API error: {e}")
            return None

    def _parse_json(self, text):
        try:
            clean_text = text.strip()
            if clean_text.startswith('```json'):
                clean_text = clean_text[7:-3]
            elif clean_text.startswith('```'):
                clean_text = clean_text[3:-3]
            data = json.loads(clean_text)
            if isinstance(data, list) and len(data) > 0:
                return data[0]
            return data
        except:
            return None

# --- PUBLIC REDDIT SCRAPER (No Auth) ---
class PublicRedditScraper:
    def __init__(self):
        self.headers = {'User-Agent': 'InvokoSignalEngine/1.0 (Public Scraper; Contact: invoko-core)'}

    def fetch_new_posts(self, subreddit_name, limit=25):
        url = f"https://www.reddit.com/r/{subreddit_name}/new.json?limit={limit}"
        try:
            res = requests.get(url, headers=self.headers)
            if res.status_code == 200:
                data = res.json()
                return data['data']['children']
            elif res.status_code == 429:
                print(f"  Rate limited on r/{subreddit_name}. Waiting...")
                time.sleep(10)
            else:
                print(f"  Error fetching r/{subreddit_name}: {res.status_code}")
        except Exception as e:
            print(f"  Exception fetching r/{subreddit_name}: {e}")
        return []

# --- MAIN LOOP ---
def run_scraper():
    db = Database()
    ai = AIService()
    scraper = PublicRedditScraper()
    
    print(f"Starting Invoko Public Scraper at {datetime.now().isoformat()}", flush=True)
    print(f"Targeting {len(SUBREDDITS)} subreddits...", flush=True)

    for sub_name in SUBREDDITS:
        print(f"\nScanning r/{sub_name}...", flush=True)
        posts = scraper.fetch_new_posts(sub_name)
        
        for post_wrapper in posts:
            post = post_wrapper['data']
            post_id = post['id']
            
            if db.is_seen(post_id):
                continue
            
            title = post['title']
            content = post.get('selftext', '')
            
            # Fast keyword filter
            keywords = ['mac', 'ai', 'productivity', 'workflow', 'automation', 'context', 'app', 'tool', 'friction', 'lag', 'shortcut', 'study', 'voice', 'speech', 'chat', 'college', 'university']
            full_text = (title + content).lower()
            if not any(kw in full_text for kw in keywords):
                continue
            
            print(f"  Analyzing: {title[:60]}...", flush=True)
            analysis = ai.analyze_post(title, content, sub_name)
            
            if analysis and isinstance(analysis, dict):
                total_score = (analysis.get('relevance', 0) * 0.5) + (analysis.get('pain', 0) * 0.3) + (analysis.get('emotion', 0) * 0.2)
                
                if total_score >= 6.0:
                    print(f"    [QUALIFIED] Lead (Score: {total_score:.1f})", flush=True)
                    db.insert_lead({
                        'id': post_id,
                        'subreddit': sub_name,
                        'title': title,
                        'author': post.get('author', 'unknown'),
                        'url': f"https://reddit.com{post.get('permalink', '')}",
                        'content': content,
                        'score': total_score,
                        'relevance_score': analysis['relevance'],
                        'pain_point_score': analysis['pain'],
                        'emotion_score': analysis['emotion'],
                        'draft_reply': analysis['draft_reply']
                    })
                else:
                    # Mark as seen in DB but not a lead (save for history)
                    db.conn.cursor().execute('INSERT INTO leads (id, processed) VALUES (?, 1)', (post_id,))
                    db.conn.commit()
            
            time.sleep(2) # Be nice to OpenRouter and Reddit

if __name__ == "__main__":
    run_scraper()
