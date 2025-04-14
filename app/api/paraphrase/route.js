export async function POST(req) {
    const { text, type = "standard" } = await req.json();

    // Define different paraphrasing types
    const types = {
        "standard": { prompt: "Rephrase the following text to sound more natural and clear." },
        "formal": { prompt: "Rephrase the following text to sound formal and professional." },
        "humanized": { prompt: "Rephrase the following text to sound more casual and human-like." },
        "student": { prompt: "Rephrase the following text as if written by a student, simple and clear." },
        "technical": { prompt: "Rephrase the following text to sound more technical and precise." },
        "persuasive": { prompt: "Rephrase the following text to sound more persuasive and convincing." },
        "concise": { prompt: "Rephrase the following text to make it shorter without losing meaning." },
    };

    const { prompt } = types[type] || types["standard"];

    const paraphraseResponse = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
            model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
            stream: true,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that rephrases text in different styles.",
                },
                {
                    role: "user",
                    content: `${prompt}\n\n${text}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 400,
        }),
    });

    const stream = new ReadableStream({
        async start(controller) {
            const reader = paraphraseResponse.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            if (!reader) {
                controller.close();
                return;
            }

            let buffer = ""; // To store incomplete chunks for proper parsing

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk; // Append new chunk to the buffer

                let lines = buffer.split("\n").filter((line) => line.startsWith("data: "));
                buffer = buffer.slice(buffer.lastIndexOf("\n") + 1); // Keep any remaining incomplete part

                for (const line of lines) {
                    const json = line.replace(/^data: /, "");
                    if (json === "[DONE]") {
                        controller.close();
                        return;
                    }

                    try {
                        const parsed = JSON.parse(json);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            controller.enqueue(new TextEncoder().encode(content));
                        }
                    } catch (err) {
                        console.error("JSON parse error:", err);
                    }
                }
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
        },
    });
}
