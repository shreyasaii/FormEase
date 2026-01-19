import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, simpleMode } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'No form text provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const prompt = simpleMode
      ? `You are a helpful assistant explaining government and college forms to parents in VERY simple language. 
      
Please analyze this form and provide:
1. What this form is for (1-2 sentences, simple words)
2. Who should fill it (simple explanation)
3. What documents are needed (list 3-5 items, simple names)
4. Where to submit it (simple instructions)
5. 2-3 common mistakes to avoid (simple warnings)

Use very simple English. Avoid jargon. Be encouraging.

Form Text:
${text}

Format your response as:
## What is this form?
[simple explanation]

## Who needs to fill it?
[simple answer]

## Documents needed:
- [item 1]
- [item 2]
etc.

## Where to submit:
[simple instructions]

## Common mistakes to avoid:
- [mistake 1]
- [mistake 2]`
      : `You are a form explanation expert. Analyze this form and provide a clear, structured explanation.

Please provide:
1. What this form is for
2. Who should fill it
3. What documents are required
4. Step-by-step submission instructions
5. Common mistakes to avoid
6. Tips for filling it correctly

Form Text:
${text}

Format your response with clear sections and bullet points.`;

    // Using Google Generative AI via free Gemini API
    // Try different model endpoints in order of preference
    const GEMINI_MODELS = [
      "gemini-3-flash",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
    ];
    const modelConfigs = [
      { model: 'gemini-3-flash', version: 'v1' },
      { model: 'gemini-2.5-flash', version: 'v1' },
      { model: 'gemini-2.5-flash-lite', version: 'v1' },
    ];
    
    let lastError: any = null;
    let response: Response | null = null;
    let data: any = null;

    // Try each model/version combination until one works
    for (const config of modelConfigs) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/${config.version}/models/${config.model}:generateContent?key=${apiKey}`;
        
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        });

        data = await response.json();

        if (response.ok) {
          console.log(`Successfully used model: ${config.model} (${config.version})`);
          break; // Success, exit loop
        } else {
          lastError = data;
          console.log(`Model ${config.model} (${config.version}) failed:`, data.error?.message);
        }
      } catch (err) {
        lastError = err;
        console.log(`Model ${config.model} (${config.version}) error:`, err);
        continue;
      }
    }

    if (!response || !response.ok) {
      console.error('Gemini API error:', lastError);
      return NextResponse.json(
        {
          error: lastError?.error?.message || lastError?.message || 'Failed to generate explanation. Please check your API key and try again.',
          details: lastError?.error || lastError,
          suggestion: 'Make sure GEMINI_API_KEY is set correctly and the API key is valid.',
        },
        { status: response?.status || 500 }
      );
    }

    const explanation =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Unable to generate explanation';

    return NextResponse.json({
      success: true,
      explanation,
      simpleMode,
    });
  } catch (error) {
    console.error('Explanation generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate form explanation' },
      { status: 500 }
    );
  }
}
