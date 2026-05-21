import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ── Subreddit Pools ──────────────────────────────────────────────────
// PROMO_SUBS: Subreddits that explicitly ALLOW self-promotion / showcase posts.
// These are the ONLY subs that can be suggested for promo posts.
const PROMO_SUBS: { name: string; desc: string }[] = [
  { name: 'r/SideProject', desc: 'showcasing new projects/tools built by developers' },
  { name: 'r/SaaS', desc: 'software-as-a-service topics and launches' },
  { name: 'r/indiehackers', desc: 'bootstrapping, indie tools, revenue discussions' },
  { name: 'r/ProductivityApps', desc: 'productivity-focused app showcases' },
  { name: 'r/selfhosted', desc: 'local-first / privacy-angle tools' },
  { name: 'r/startups', desc: 'general startup discussions and launches' },
  { name: 'r/solopreneur', desc: 'solo builds and one-person businesses' },
  { name: 'r/AIToolCompare', desc: 'comparing and showcasing AI tools' },
  { name: 'r/AI_Automations', desc: 'AI workflows and automations' },
  { name: 'r/AI_Agents', desc: 'agentic AI showcases and discussions' },
  { name: 'r/microsaas', desc: 'micro-SaaS showcases and discussions' },
];

// NO_PROMO_SUBS: Subreddits that STRICTLY FORBID self-promotion.
// These are the ONLY subs that can be suggested for non-promo (trojan horse) posts.
const NO_PROMO_SUBS: { name: string; desc: string }[] = [
  { name: 'r/macapps', desc: 'macOS apps and developer workflow discussion' },
  { name: 'r/MacOS', desc: 'macOS features and OS-level productivity' },
  { name: 'r/productivity', desc: 'general productivity discussions' },
  { name: 'r/shortcuts', desc: 'mac/iOS shortcuts and automation' },
  { name: 'r/Raycast', desc: 'mac launcher and developer extensions' },
  { name: 'r/alfred', desc: 'mac productivity launcher' },
  { name: 'r/KeyboardMaestro', desc: 'mac automation' },
  { name: 'r/ObsidianMD', desc: 'knowledge management, local-first markdown note-taking' },
  { name: 'r/apple', desc: 'apple ecosystem / hardware / software discussions' },
  { name: 'r/software', desc: 'general software discussion' },
  { name: 'r/artificial', desc: 'broad AI and machine learning discussion' },
  { name: 'r/LocalLLaMA', desc: 'local LLMs, privacy-first AI, offline intelligence' },
  { name: 'r/ADHD_Programmers', desc: 'ADHD, focus, and coding tools' },
  { name: 'r/ADHDproductivity', desc: 'ADHD productivity hacks' },
  { name: 'r/DeepWork', desc: 'focused work methods' },
  { name: 'r/SecondBrain', desc: 'personal knowledge bases and context tracking' },
  { name: 'r/OpenAI', desc: 'OpenAI / GPT usage and limitations' },
  { name: 'r/ChatGPT', desc: 'ChatGPT usage and limitations' },
  { name: 'r/ClaudeAI', desc: 'Claude AI usage and limitations' },
  { name: 'r/developersIndia', desc: 'indian developers and workspace discussion' },
];

// ── Helper ───────────────────────────────────────────────────────────
function buildSubList(pool: { name: string; desc: string }[], excluded: string[]): string {
  const excludedLower = excluded.map(s => s.toLowerCase().replace(/^r\//, ''));
  const filtered = pool.filter(
    s => !excludedLower.includes(s.name.toLowerCase().replace(/^r\//, ''))
  );
  if (filtered.length === 0) return '(all options exhausted — pick the best subreddit you know of that fits the post type)';
  return filtered.map(s => `- ${s.name} (${s.desc})`).join('\n');
}


export async function POST(request: Request) {
  try {
    // Determine which AI service to use based on available keys
    const useGemini = !!process.env.GEMINI_API_KEY;
    const genAI = useGemini ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY!) : null;
    // Ensure at least one API key is present
    if (!useGemini && !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing AI service API key (Gemini or Groq)' }, { status: 500 });
    }

    const { posts, layer, promo, excludeSubreddits } = await request.json();
    const excluded: string[] = excludeSubreddits || [];

    const model = useGemini ? genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

    const postsContext = posts.map((p: any, i: number) => `Post ${i+1}:\nTitle: ${p.title}\nContent: ${p.selftext}`).join('\n\n');

    // Build the allowed subreddit list based on post type, with rejected subs pre-filtered
    const allowedSubsList = buildSubList(promo ? PROMO_SUBS : NO_PROMO_SUBS, excluded);

    const prompt = promo ? `
You are Invoko Core. Write a high-engagement, "viral-style" Reddit post that SHOWCASES Invoko.ai.
STRICT RULE: NO AI SLOP. NO FORMAL SENTENCES. NO "I HAVE FOUND". 

FRAME: "Problem-Solution / Showcase"
STYLE: 
- lowercase only.
- use fragments. 
- sound like a dev who is proud of what they built.
- use "tbh", "literally", "finally", "game changer".

CONTENT:
- start with a relatable pain point found in the analyzed posts (e.g., app-switching hell, context loss).
- explain how Invoko.ai solves this specifically with "screen context awareness" and the \`soul.md\` system.
- be explicit about the benefits: focus, speed, privacy.
- ask for feedback or "check it out if you're hitting the same wall".
- avoid being "salesy", keep it dev-to-dev.

SUBREDDIT SELECTION RULE:
This is a PROMOTIONAL post. You MUST ONLY pick from the following promo-friendly subreddits. DO NOT suggest any subreddit outside this list:
${allowedSubsList}

Pick the SINGLE best subreddit from the list above that fits the generated content.

Analyze these posts:
${postsContext}

Return JSON: {"title": "...", "body": "...", "suggestedSubreddit": "..."}.
    ` : `
You are a Redditor who is fed up with the current state of tech/AI. 
STRICT RULES:
- NO DASHES (— or -) allowed in the body or title.
- NO FORMAL SENTENCES. NO "I HAVE FOUND".
- NO PROMOTIONAL CONTENT. DO NOT mention "Invoko", "invoko.ai", or any specific product.
- DO NOT use "I built this" or "I'm working on".
- LOWERCASE ONLY.
- USE REDDIT SLANG (tbh, idk, literally, bs, lowkey, fr, slop).

FRAME: "A Raw Technical Observation/Rant"
STYLE: 
- lowercase only.
- use fragments. 
- sound skeptical of "generic AI" and "surface-level tools".

CONTENT:
- frame the post as a critique of a specific technical pain point (e.g., "ai context is mostly bs right now").
- talk about how generic models fail at understanding real-world project state.
- ask a question or pose a "hot take" to spark a debate in the comments.
- the goal is 100% engagement so the user can DM the commenters later.

SUBREDDIT SELECTION RULE:
This is a NON-PROMOTIONAL post. You MUST ONLY pick from the following no-promo subreddits that strictly forbid self-promotion. DO NOT suggest any subreddit outside this list:
${allowedSubsList}

Pick the absolute best subreddit from the list above to maximize discussion and debate among targeted users (mac users, developers, productivity enthusiasts).

Analyze these posts:
${postsContext}

Return JSON: {"title": "...", "body": "...", "suggestedSubreddit": "..."}.
    `;

    if (useGemini) {
      try {
        const result = await model!.generateContent(prompt);
        const text = await result.response.text();
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return NextResponse.json(JSON.parse(cleanText));
      } catch (geminiError) {
        console.error('Gemini error:', geminiError);
      }
    }
    // Fallback to Groq
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY for fallback' }, { status: 500 });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that only responds in valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    const data: any = await groqResponse.json();
    if (data.error) {
      return NextResponse.json({ error: 'Groq API Error', details: data.error }, { status: 500 });
    }

    const content = data?.choices?.[0]?.message?.content?.trim() ?? '';
    try {
      return NextResponse.json(JSON.parse(content));
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to parse response from Groq', raw: content }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

