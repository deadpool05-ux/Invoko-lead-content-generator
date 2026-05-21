import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';



export async function POST(request: Request) {
  try {
    // Determine which AI service to use based on available keys
    const useGemini = !!process.env.GEMINI_API_KEY;
    const genAI = useGemini ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY!) : null;
    // Ensure at least one API key is present
    if (!useGemini && !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing AI service API key (Gemini or Groq)' }, { status: 500 });
    }

    const { posts, layer, promo } = await request.json();

    const model = useGemini ? genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

    const postsContext = posts.map((p: any, i: number) => `Post ${i+1}:\nTitle: ${p.title}\nContent: ${p.selftext}`).join('\n\n');

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
Since this is a promotional post, you MUST choose a suggested subreddit that explicitly ALLOWS self-promotion or showcase posts. Pick the SINGLE best subreddit from this list that fits the generated content the most to get people to believe in Invoko and give it a shot:
- r/SideProject (best for showcasing new projects/tools built by developers)
- r/SaaS (best for software-as-a-service topics)
- r/indiehackers (best for bootstrapping, indie tools)
- r/ProductivityApps (best for productivity-focused app showcases)
- r/selfhosted (if the tool has local-first/privacy angles)
- r/startups (general startups)
- r/solopreneur (for solo builds)
- r/AIToolCompare (specifically comparing/showcasing AI tools)
- r/AI_Automations (for AI workflows and automations)
- r/AI_Agents (for agentic AI showcases)
- r/microsaas (for micro-SaaS showcase)

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
Since this post is non-promotional and contains no links or brand names, you are completely UNBOUND by self-promotion rules. Pick the absolute best subreddit for the following topics to maximize discussion and debate among targeted users (mac users, developers, productivity enthusiasts):
- r/macapps (if about macOS apps or developer workflow)
- r/MacOS (if about macOS features or OS-level productivity)
- r/productivity (general productivity discussions)
- r/shortcuts (mac/iOS shortcuts and automation)
- r/Raycast (mac launcher and developer extensions)
- r/alfred (mac productivity launcher)
- r/KeyboardMaestro (mac automation)
- r/ObsidianMD (knowledge management, local-first markdown note-taking)
- r/apple (apple ecosystem/hardware/software discussions)
- r/software (general software discussion)
- r/artificial (broad AI and machine learning discussion)
- r/LocalLLaMA (local LLMs, privacy-first AI, offline intelligence)
- r/AI_Agents (AI agents, autonomous tools)
- r/ADHD_Programmers (ADHD, focus, and coding tools)
- r/ADHDproductivity (ADHD productivity hacks)
- r/DeepWork (focused work methods)
- r/SecondBrain (personal knowledge bases and context tracking)
- r/OpenAI / r/ChatGPT / r/ClaudeAI (general LLM usage and limitations)
- r/developersIndia (indian developers and workspace discussion)

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
