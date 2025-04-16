"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HoverBar from "@/components/HoverBar"; // Import HoverBar

export default function GrammarCheckPage() {
    const [inputText, setInputText] = useState("");
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    const [isChecking, setIsChecking] = useState(false);

    const handleTextChange = (e) => {
        setInputText(e.target.value);
    };

    const checkGrammar = async () => {
        setIsChecking(true);
        try {
            const response = await fetch("/api/grammar-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) throw new Error("Grammar check failed.");

            const data = await response.json();
            const { suggestions, corrected } = data;

            // Always store the result so Accept can work
            setGrammarSuggestions([{ issue: suggestions, replacement: corrected }]);
        } catch (error) {
            console.error("Grammar check failed:", error);
        }
        setIsChecking(false);
    };

    const handleAcceptChange = (index) => {
        setInputText(grammarSuggestions[index].replacement); // ✅ set corrected paragraph
        setGrammarSuggestions([]);
    };

    const handleDiscardChange = (index) => {
        setGrammarSuggestions([]);
    };

    return (
        <div className="min-h-screen bg-white px-6 md:px-16 py-12 space-y-12 font-[Poppins,sans-serif]">
            {/* HoverBar Component */}
          {/* Render HoverBar on this page */}

            {/* Heading */}
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                    AI Grammar Checker
                </h1>
                <p className="text-gray-500 text-sm">
                    Check and improve your grammar with AI suggestions.
                </p>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Text */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 mb-2">Write Your Document</label>
                    <textarea
                        value={inputText}
                        onChange={handleTextChange}
                        className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Start writing here..."
                    />
                </div>

                {/* Grammar Suggestions */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 mb-2">Grammar Suggestions</label>
                    <div className="space-y-4">
                        {isChecking ? (
                            <p>Checking grammar...</p>
                        ) : grammarSuggestions.length === 0 ? (
                            <p>No grammar mistakes found!</p>
                        ) : (
                            grammarSuggestions.map((suggestion, index) => (
                                <div key={index} className="border p-4 bg-gray-50 rounded-xl">
                                    <p className="mb-2 font-semibold">Corrections:</p>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p className="text-sm leading-relaxed text-gray-700" {...props} />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul className="list-disc ml-6 text-sm text-gray-700" {...props} />
                                            ),
                                            li: ({ node, ...props }) => (
                                                <li className="mb-1" {...props} />
                                            ),
                                        }}
                                    >
                                        {suggestion.issue}
                                    </ReactMarkdown>

                                    <p className="mt-4 font-semibold">Corrected Paragraph:</p>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p className="text-sm leading-relaxed text-gray-800" {...props} />
                                            ),
                                        }}
                                    >
                                        {suggestion.replacement}
                                    </ReactMarkdown>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleAcceptChange(index)}
                                            className="px-6 py-2 bg-green-500 text-white rounded-lg"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDiscardChange(index)}
                                            className="px-6 py-2 bg-red-500 text-white rounded-lg"
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Button to Trigger Grammar Check */}
                    <div className="mt-6">
                        <button
                            onClick={checkGrammar}
                            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-all font-medium"
                        >
                            Check Grammar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
