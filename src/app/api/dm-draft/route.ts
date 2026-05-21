import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const useGemini = !!process.env.GEMINI_API_KEY;
    const useGroq = !!process.env.GROQ_API_KEY;

    if (!useGemini && !useGroq) {
      return NextResponse.json(
        { error: 'Missing AI service API key (Gemini or Groq).' },
        { status: 500 }
      );
    }

    const { postTitle, postText, subreddit, author } = await request.json();

    const genAI = useGemini ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY!) : null;
    const model = useGemini ? genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

    const prompt = `
You are writing a DIRECT MESSAGE (DM) on Reddit to a user named u/${author || 'unknown'}.
You represent Aaditri GlobalTech — a premium technology studio that builds flagship products like **Invoko.ai** (AI voice assistant for Mac with screen awareness), ExitDebt (fintech), and myVplayer (edtech).

This user posted the following in r/${subreddit}:
Title: ${postTitle}
Content: ${postText}

DM STRATEGY:
1. OPEN WITH CONTEXT: Reference their post naturally so they know why you're reaching out. Don't be creepy — be specific and genuine.
2. EMPATHIZE AND VALIDATE: Acknowledge their pain point or situation. Show you actually understand the technical challenge.
3. OFFER SPECIFIC VALUE: Don't pitch services generically. Mention a specific, relevant solution or insight from your experience building Invoko or other products.
4. SOFT CTA: End with a low-pressure call to action — offering to hop on a quick call, share a resource, or just chat about it.

DM RULES:
- This is a PRIVATE message, not a public comment. Be warmer and more direct than you would in a comment.
- NO EMOJIS.
- NO markdown formatting (no bolding, no italics, no bullet points).
- Use lowercase where natural to sound human.
- NO "hey there!" or "hope this finds you well" or any corporate opener.
- NO "in conclusion" or signposting.
- Keep it 4-6 sentences. Short and punchy.
- Sound like a real person who saw their post and genuinely wants to help — not a cold outreach bot.
- Mention Invoko only if naturally relevant to their problem.
- Provide ONLY the exact text to paste into the DM box. Nothing else.

EXAMPLE STYLE:
"saw your post about [specific thing] in r/[sub] — been dealing with a similar problem while building invoko (context-aware voice assistant). the real bottleneck isn't [surface issue] tbh, it's [deeper technical issue] which most solutions just gloss over. we ended up [specific approach] and it cut our [metric] in half. happy to walk you through what worked if you want to jump on a quick call sometime."
`;

    if (useGemini) {
      try {
        const result = await model!.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({ draft: text.trim() });
      } catch (geminiError) {
        if (!useGroq) throw geminiError;
      }
    }

    // Fallback to Groq
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data: any = await groqResponse.json();
    if (data.error) {
      return NextResponse.json({ error: 'Groq API Error', details: data.error }, { status: 500 });
    }

    const text = data?.choices?.[0]?.message?.content?.trim() ?? '';
    return NextResponse.json({ draft: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
