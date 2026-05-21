import pandas as pd
import re
import os

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('---')
    data = []
    
    sub_pattern = re.compile(r'### \d+\. r/([\w/]+)')
    title_pattern = re.compile(r'\*\*Title:\*\* (.+)')
    
    for section in sections:
        section = section.strip()
        if not section:
            continue
            
        sub_match = sub_pattern.search(section)
        title_match = title_pattern.search(section)
        
        if sub_match and title_match:
            subreddit = f"r/{sub_match.group(1)}"
            title = title_match.group(1).strip()
            
            title_end = section.find(title_match.group(0)) + len(title_match.group(0))
            body = section[title_end:].strip()
            
            data.append({
                'Subreddit': subreddit,
                'Title': title,
                'Body': body,
                'Reddit Link': '',
                'Discord Link': ''
            })
            
    return data

def main():
    md_file = r'c:\Users\rayde\OneDrive\Documents\invokeai\docs\CURATED_POSTS_5_4.md'
    output_file = r'c:\Users\rayde\OneDrive\Documents\invokeai\docs\CURATED_POSTS_5_4_with_links.xlsx'
    
    data = parse_markdown(md_file)
    
    # Links provided by user
    links = [
        "https://www.reddit.com/r/automation/comments/1t40qto/the_boring_utility_gap_that_zapier_structurally/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
        "https://discord.com/channels/@me/1501004758499197170/1501041046396866570",
        "https://www.reddit.com/r/MacOS/comments/1t41i8j/building_a_context_bridge_for_mac_tired_of_the/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
        "https://discord.com/channels/@me/1501004758499197170/1501041608890781866"
    ]
    
    # Map links to subreddits
    for item in data:
        if item['Subreddit'] == 'r/automation':
            item['Reddit Link'] = links[0]
            item['Discord Link'] = links[1]
        elif item['Subreddit'] == 'r/MacOS':
            item['Reddit Link'] = links[2]
            item['Discord Link'] = links[3]
            
    df = pd.DataFrame(data)
    
    # Use format from hades 5_4 (no headers, 3 columns initially but adding 2 more)
    # The user said "use and copy the format in hades5/4", but also "embed all these links in the columns side by side too".
    # I'll include headers if it's better for links, but if they want "exactly like hades", I'll check if hades has headers.
    # Hades seems to have NO headers based on my previous analysis.
    
    print(f"Saving to {output_file}...")
    df.to_excel(output_file, index=False, header=False)
    print("Done!")

if __name__ == "__main__":
    main()
