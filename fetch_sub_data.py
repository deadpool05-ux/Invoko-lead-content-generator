import os
import json
import urllib.request
import time

def fetch_top_posts(subreddit):
    url = f"https://www.reddit.com/r/{subreddit}/top.json?t=week&limit=25"
    req = urllib.request.Request(url, headers={'User-Agent': 'DazecoLeadScraper/1.0'})
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Error fetching {subreddit}: {e}")
        return None

def main():
    subreddits = [
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
        subreddits = [sub for sub in subreddits if sub.lower() not in SELF_PROMO_SUBREDDITS]

    output_dir = r"c:\Users\rayde\OneDrive\Documents\invokeai\docs\sub_analysis"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for sub in subreddits:
        print(f"Fetching top posts for r/{sub}...")
        data = fetch_top_posts(sub)
        if data and 'data' in data:
            posts = data['data']['children']
            md_content = f"# Top Posts of the Week: r/{sub}\n\n"
            for post in posts:
                p = post['data']
                md_content += f"## {p['title']}\n"
                md_content += f"**Author:** u/{p['author']} | **Upvotes:** {p['ups']} | **Comments:** {p['num_comments']}\n\n"
                if p['selftext']:
                    md_content += f"{p['selftext'][:1000]}...\n\n" if len(p['selftext']) > 1000 else f"{p['selftext']}\n\n"
                md_content += "---\n\n"
            
            file_path = os.path.join(output_dir, f"r_{sub}.md")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(md_content)
            print(f"Saved to {file_path}")
        
        time.sleep(2)

if __name__ == "__main__":
    main()
