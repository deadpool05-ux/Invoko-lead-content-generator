import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Removed global initialization to support dynamic fallback


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

    const { postTitle, postText, subreddit } = await request.json();

    const genAI = useGemini ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY!) : null;
    const model = useGemini ? genAI!.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

    const prompt = `
You are Aaditri GlobalTech, a premium technology studio.
We build flagship products like **Invoko.ai** (AI voice assistant for Mac with screen awareness), ExitDebt (fintech), and myVplayer (edtech).

STRATEGY (The "Aaditri Framework"):
1. ACKNOWLEDGE THE EMOTION: Be direct and empathetic to the user's workflow frustration or technical hurdle.
2. INJECT TECHNICAL REALITY: Give hard, contrarian advice. No corporate fluff.
3. THE CURIOSITY GAP (SOFT PITCH): Subtly mention we build our own stuff (like Invoko) or architect "bare-metal" systems for clients.

REPLY RULES:
- NO EMOJIS.
- NO signposting ("firstly", "in conclusion").
- NO markdown formatting (no bolding, no italics).
- Use lowercase where it feels natural to sound like a human Redditor.
- Maximum 2-3 short paragraphs.

You are replying to this post in r/${subreddit}:
Title: ${postTitle}
Content: ${postText}

CRITICAL RULES FOR YOUR REPLY:
1. Speak exactly like a normal Reddit user. Use all lowercase (or minimal capitalization), use abbreviations (rn, tbh, afaik, imo, wtf, dm).
2. TONE: Skeptical, technical, and contrarian. Validate the user's frustration by calling out why current solutions (especially "generic AI") are "mostly bs" or "surface-level".
3. NO AI SLOP. Absolutely NO bullet points, NO dashes, NO emojis, NO "hello there", NO "in conclusion", NO corporate speak.
4. THE "TROJAN HORSE" PITCH: Subtly tie their problem back to the technical complexity you faced building **Invoko**. Mention Invoko as a peer tool that solved similar deep-context or intent-understanding issues.
5. CALL TO ACTION: Tell them to "hit my inbox" or "dm me" if they are serious about building the technical backend/architecture for actual deep features, not just surface-level stuff.
6. EXAMPLE STYLE: "yeah, the whole [topic] thing is mostly bs right now, tbh. it's good at [regurgitating] but real learning involves [synthesis] which generic models just don't do. we've run into similar issues building out stuff like invoko where the nuance of understanding user intent from context is everything. if you're serious about the technical backend, hit my inbox."
7. Provide ONLY the exact text to paste into the comment box. Nothing else.
8. Keep it short. 3-5 sentences max.
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
