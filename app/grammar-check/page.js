"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <div className="flex justify-center items-center min-h-screen bg-white py-10">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-4/5 lg:w-3/4 xl:w-2/3">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    AI Grammar Checker
                </h1>

                <div className="flex gap-6 mb-6">
                    {/* Left - Editor */}
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                            Write Your Document
                        </label>
                        <textarea
                            value={inputText}
                            onChange={handleTextChange}
                            className="w-full h-72 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Start writing here..."
                        />
                    </div>

                    {/* Right - Suggestions */}
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                            Grammar Suggestions
                        </label>
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

                        <div className="mt-6">
                            <button
                                onClick={checkGrammar}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Check Grammar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
