import urllib.request
import json
import time
import ssl

# Bypass SSL certificate validation if necessary
ssl_context = ssl._create_unverified_context()

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
    'AIConversations', 'homeworkhelp', 'studyips', 'WorkFromHome',
    'forhire', 'freelance_forhire', 'developerjobs', 'devjobs', 'jobbit', 'hiring'
]

keywords = ['promo', 'promote', 'advert', 'market', 'spam', 'showcase', 'sell', 'affiliate', 'commercial', 'solicit']

results = []

for sub in subreddits:
    print(f"Fetching rules for r/{sub}...")
    url = f"https://www.reddit.com/r/{sub}/about/rules.json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, context=ssl_context) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            sub_rules = data.get('rules', [])
            matched_rules = []
            
            for rule in sub_rules:
                name = rule.get('short_name', '')
                desc = rule.get('description', '')
                full_text = f"{name} {desc}".lower()
                
                # Check for keywords
                found_kws = [kw for kw in keywords if kw in full_text]
                if found_kws:
                    matched_rules.append({
                        'rule_name': name,
                        'description': desc,
                        'keywords': found_kws
                    })
            
            results.append({
                'subreddit': sub,
                'status': 'success',
                'all_rules': [r.get('short_name', '') for r in sub_rules],
                'promo_rules': matched_rules
            })
            
    except Exception as e:
        print(f"Error r/{sub}: {e}")
        results.append({
            'subreddit': sub,
            'status': 'error',
            'error': str(e)
        })
    
    # Sleep to prevent rate-limiting
    time.sleep(1.5)

# Write results to JSON
with open('subreddit_rules_analysis.json', 'w') as f:
    json.dump(results, f, indent=4)

print("\nAnalysis completed and saved to subreddit_rules_analysis.json")
