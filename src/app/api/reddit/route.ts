import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get('layer') || 'direct';

  const subredditsMap: Record<string, string[]> = {
    direct: [
      'forhire', 'freelance_forhire', 'developerjobs', 'devjobs', 'jobbit', 
      'hiring', 'WebDevJobs', 'WebDeveloperJobs', 'wordpressjobs', 'Shopifyjobs', 
      'WebflowJobs', 'devopsjobs', 'sysadminjobs', 'b2bforhire', 'devsforhire'
    ],
    intent: [
      'startups', 'SaaS', 'Entrepreneur', 'smallbusiness', 'indiehackers', 
      'microsaas', 'startupideas', 'SideProject', 'ecommerce', 'shopify', 'dropship'
    ],
    tech: [
      'ArtificialIntelligence', 'MachineLearning', 'OpenAI', 'LocalLLaMA', 'AIdev', 
      'learnmachinelearning', 'ai', 'ml', 'automation', 'crm', 'datascience', 
      'dataengineering', 'analytics', 'cybersecurity', 'devops', 'backend', 'frontend', 'webdev'
    ],
    india: [
      'developersIndia', 'StartUpIndia', 'IndianStartups', 'IndiaJobsOpenings', 'IndiaJobs', 'IndiaCareers'
    ],
    productivity: [
      'macapps', 'productivity', 'shortcuts', 'MacOS', 'SaaS', 'automation', 
      'mac', 'apple', 'software', 'SideProject', 'workflow', 'selfhosted', 'developersIndia', 'macOSbeta'
    ],
    invoko: [
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
  };

  const excludeSelfPromo = searchParams.get('excludeSelfPromo') === 'true';

  const SELF_PROMO_SUBREDDITS = [
    'sideproject', 'saas', 'entrepreneur', 'startups', 'indiehackers', 
    'microsaas', 'startupideas', 'solopreneur', 'aitoolcompare', 
    'ai_automations', 'ai_agents', 'selfhosted', 'startupindia', 
    'indianstartups', 'freelance'
  ];

  let selectedSubs = subredditsMap[layer] || subredditsMap.direct;
  if (excludeSelfPromo) {
    selectedSubs = selectedSubs.filter(sub => !SELF_PROMO_SUBREDDITS.includes(sub.toLowerCase()));
  }

  if (selectedSubs.length === 0) {
    return NextResponse.json({ kind: 'Listing', data: { children: [] } });
  }

  const subredditsString = selectedSubs.join('+');

  try {
    const res = await fetch(`https://www.reddit.com/r/${subredditsString}/new.json?limit=50`, {
      headers: {
        'User-Agent': 'DazecoLeadScraper/1.0 (Contact: dazeco-admin)',
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Reddit API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
