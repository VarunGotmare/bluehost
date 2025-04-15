"use client";
import { useState } from "react";
import HoverBar from "@/components/HoverBar"; // Import HoverBar

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
        <div className="min-h-screen bg-white px-6 md:px-16 py-12 space-y-12 font-[Poppins,sans-serif]">
            {/* HoverBar Component */}
            <HoverBar /> {/* Render HoverBar on this page */}

            {/* Heading */}
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                    AI Text Paraphraser
                </h1>
                <p className="text-gray-500 text-sm">
                    Paraphrase your text instantly with AI assistance.
                </p>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Text */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 mb-2">Enter Text</label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Paste or write your content here..."
                    />
                </div>

                {/* Output Paraphrased Text */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 mb-2">Paraphrased Text</label>
                    <textarea
                        value={paraphrasedText}
                        readOnly
                        className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-800 overflow-auto resize-none"
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
                    className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-950 transition font-medium"
                >
                    Paraphrase
                </button>
            </div>
        </div>
    );
}
