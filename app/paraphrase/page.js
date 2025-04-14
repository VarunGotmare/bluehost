"use client";
import { useState } from "react";

export default function ParaphrasePage() {
    const [inputText, setInputText] = useState("");
    const [paraphrasedText, setParaphrasedText] = useState("");
    const [paraphraseType, setParaphraseType] = useState("standard");

    // Options for paraphrasing types
    const paraphraseTypes = [
        { label: "Standard", value: "standard" },
        { label: "Formal", value: "formal" },
        { label: "Humanized", value: "humanized" },
        { label: "Student", value: "student" },
        { label: "Technical", value: "technical" },
        { label: "Persuasive", value: "persuasive" },
        { label: "Concise", value: "concise" },
    ];

    // Handle button click to set paraphrase type
    const handleTypeChange = (type) => {
        setParaphraseType(type);
    };

    // Handle the paraphrase action
    const handleParaphrase = async () => {
        setParaphrasedText(""); // Clear previous paraphrased text
        try {
            const res = await fetch("/api/paraphrase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText, type: paraphraseType }),
            });

            if (!res.body) {
                setParaphrasedText("No response body.");
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let result = "";
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                result += chunk; // Append new chunk to the result

                // Update the state as the text comes in
                setParaphrasedText((prev) => prev + chunk);
            }
        } catch (err) {
            console.error("Error while paraphrasing:", err);
            setParaphrasedText("Something went wrong while paraphrasing.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white py-10">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-4/5 lg:w-3/4 xl:w-2/3">
                {/* Title */}
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">AI Text Paraphraser</h1>

                <div className="flex gap-6 mb-6">
                    {/* Left - Input Text Area */}
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">Enter Text</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-72 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Paste or write your content here..."
                        />
                    </div>

                    {/* Right - Paraphrased Text Area */}
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">Paraphrased Text</label>
                        <textarea
                            value={paraphrasedText}
                            readOnly
                            className="w-full h-72 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your paraphrased content will appear here..."
                        />
                    </div>
                </div>

                {/* Paraphrase Type Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    {paraphraseTypes.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => handleTypeChange(type.value)}
                            className={`px-6 py-2 rounded-lg font-semibold text-lg transition-all duration-300 
                                ${paraphraseType === type.value ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} 
                                hover:bg-blue-500 hover:text-white`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Button to Trigger Paraphrasing */}
                <div className="flex justify-center">
                    <button
                        onClick={handleParaphrase}
                        className="mt-4 w-48 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Paraphrase
                    </button>
                </div>
            </div>
        </div>
    );
}
