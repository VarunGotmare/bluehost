"use client";
import { useState } from "react";
import HoverBar from "@/components/HoverBar"; // Import HoverBar

export default function SummarizePage() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState(50);
  const [summaryLevel, setSummaryLevel] = useState("medium");

  const lengthStops = [
    { label: "ultra-short", value: 20 },
    { label: "short", value: 40 },
    { label: "medium", value: 60 },
    { label: "long", value: 100 },
  ];

  const handleSliderChange = (e) => {
    const selectedIndex = parseInt(e.target.value);
    const selectedStop = lengthStops[selectedIndex];
    setSummaryLength(selectedStop.value);
    setSummaryLevel(selectedStop.label);
  };

  const handleSummarize = async () => {
    setSummary("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, level: summaryLevel }),
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
    <div className="min-h-screen bg-white px-6 md:px-16 py-12 space-y-12 font-[Poppins,sans-serif]">
      {/* HoverBar Component */}
      <HoverBar /> {/* Render HoverBar on this page */}

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
          AI Text Summarizer
        </h1>
        <p className="text-gray-500 text-sm">
          Summarize your content in seconds. Powered by AI.
        </p>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Enter Text</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Paste or write your content here..."
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Summary</label>
          <textarea
            value={summary}
            readOnly
            className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 resize-none"
            placeholder="Your summarized content will appear here..."
          />
        </div>
      </div>

      {/* Slider + Controls */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-lg font-medium text-gray-800">Summary Length</label>

        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={lengthStops.findIndex((stop) => stop.value === summaryLength)}
          onChange={handleSliderChange}
          className="w-full max-w-md h-2 bg-blue-200 rounded-full appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between w-full max-w-md text-xs text-gray-500 px-1">
          {lengthStops.map((stop) => (
            <span key={stop.value}>{stop.label}</span>
          ))}
        </div>

        <div className="text-sm text-gray-600 italic mt-1">
          Selected: {lengthStops.find((stop) => stop.value === summaryLength)?.label}
        </div>

        {/* Button */}
        <button
          onClick={handleSummarize}
          className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-950 transition font-medium"
        >
          Summarize
        </button>
      </div>
    </div>
  );
}
