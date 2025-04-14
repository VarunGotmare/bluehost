"use client";
import { useState } from "react";

export default function SummarizePage() {
    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [summaryLength, setSummaryLength] = useState(50); // Default to medium (50%)

    // Define the summary lengths corresponding to stops
    const lengthStops = [
        { label: "ultra-short", value: 20 },
        { label: "short", value: 40 },
        { label: "medium", value: 60 },
        { label: "long", value: 100 },
    ];

    const handleSliderChange = (e) => {
        const selectedIndex = parseInt(e.target.value);
        const selectedStop = lengthStops[selectedIndex];
        setSummaryLength(selectedStop.value); // This updates the summaryLength state
        setSummaryLevel(selectedStop.label); // Set the selected summary level string
    };

    // Define state to hold the summary level string (matching your backend expectations)
    const [summaryLevel, setSummaryLevel] = useState("medium"); // Default to 'medium'

    // Modify the POST request to send the summary level
    const handleSummarize = async () => {
        setSummary(""); // Clear previous summary
        try {
            const res = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText, level: summaryLevel }), // Send summaryLevel string instead of summaryLength value
            });

            if (!res.body) {
                setSummary("No response body.");
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setSummary((prev) => prev + chunk);
            }
        } catch (err) {
            console.error("Error while summarizing:", err);
            setSummary("Something went wrong while summarizing.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white py-10">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-4/5 lg:w-3/4 xl:w-2/3">
                {/* Title */}
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">AI Text Summarizer</h1>

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

                    {/* Right - Summary Text Area */}
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">Summary</label>
                        <textarea
                            value={summary}
                            readOnly
                            className="w-full h-72 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your summarized content will appear here..."
                        />
                    </div>
                </div>

                {/* Slider and Button */}
                <div className="flex flex-col items-center mb-6">
                    <label className="text-lg font-semibold text-gray-800 mb-2">Summary Length</label>
                    <input
                        type="range"
                        min="0"
                        max="3"
                        value={lengthStops.findIndex((stop) => stop.value === summaryLength)} // Ensure the value corresponds to the index of the selected stop
                        onChange={handleSliderChange}
                        className="w-4/5 h-2 bg-gray-300 rounded-lg mb-4"
                    />
                    <div className="flex justify-between w-4/5">
                        {lengthStops.map((stop) => (
                            <span key={stop.value} className="text-sm text-gray-600">
                                {stop.label}
                            </span>
                        ))}
                    </div>
                    <div className="text-sm text-gray-600">{lengthStops.find((stop) => stop.value === summaryLength)?.label}</div>

                    <button
                        onClick={handleSummarize}
                        className="mt-4 w-48 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Summarize
                    </button>
                </div>
            </div>
        </div>
    );
}
