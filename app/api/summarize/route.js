export async function POST(req) {
    const { text, level = "medium" } = await req.json();

    const levels = {
        "ultra-short": { max_tokens: 100, extraPrompt: "Keep it extremely brief." },
        "short": { max_tokens: 200, extraPrompt: "Keep it brief." },
        "medium": { max_tokens: 350, extraPrompt: "Summarize it concisely." },
        "long": { max_tokens: 500, extraPrompt: "Summarize it in detail, but still concisely." },
    };

    const { max_tokens, extraPrompt } = levels[level] || levels["medium"];

    const togetherResponse = await fetch("https://api.together.xyz/v1/chat/completions", {
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
                    content: "You are a helpful assistant that summarizes long texts concisely.",
                },
                {
                    role: "user",
                    content: `Summarize the following text. ${extraPrompt}\n\n${text}`,
                },
            ],
            temperature: 0.5,
            max_tokens,
        }),
    });

    const stream = new ReadableStream({
        async start(controller) {
            const reader = togetherResponse.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            if (!reader) {
                controller.close();
                return;
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

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
