export async function POST(req) {
    const { text } = await req.json();

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
            model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
            stream: false,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an AI assistant that reviews text for grammar and spelling mistakes. Only suggest corrections for actual errors. If the text is grammatically correct, simply say 'The paragraph is grammatically correct.' Do not rephrase the paragraph unless there is a clear mistake in grammar, spelling, or punctuation.",
                },
                {
                    role: "user",
                    content: `Check the following text for any grammar, spelling, or punctuation mistakes. Provide only the necessary corrections clearly, showing the original mistake and the correction. If the text is grammatically correct, say 'The paragraph is grammatically correct.' Do not rephrase the entire paragraph unless necessary.\n\n${text}`,
                },
            ],
            temperature: 0.5,
            max_tokens: 1000,
        }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let suggestions = "No corrections needed.";
    let corrected = text;

    if (!content.toLowerCase().includes("the paragraph is grammatically correct")) {
        const parts = content.split(/Corrected Paragraph:/i);

        if (parts.length === 2) {
            suggestions = parts[0].trim();
            const aiCorrected = parts[1].trim();

            // Use only if it's actually different from the original text
            if (aiCorrected && aiCorrected !== text) {
                corrected = aiCorrected;
            }
        } else {
            // fallback: treat entire content as suggestion
            suggestions = content.trim();
        }
    }

    return new Response(
        JSON.stringify({
            suggestions,
            corrected,
        }),
        {
            headers: { "Content-Type": "application/json" },
        }
    );
}
