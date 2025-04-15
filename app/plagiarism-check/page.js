"use client";
import { useState } from "react";
import HoverBar from "@/components/HoverBar"; // Import HoverBar

export default function PlagiarismCheckPage() {
  const [inputText, setInputText] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch("/api/plagiarism-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      setReport(data);
    } catch (error) {
      console.error("Error checking plagiarism:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-12 space-y-12 font-[Poppins,sans-serif]">
      {/* HoverBar Component */}
      <HoverBar /> {/* Render HoverBar on this page */}

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
          AI Plagiarism Checker
        </h1>
        <p className="text-gray-500 text-sm">
          Detect copied content instantly. Powered by AI.
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

        {/* Output Report */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Plagiarism Report</label>
          <div className="flex-grow min-h-[300px] p-5 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-800 overflow-auto">
            {loading ? (
              "Checking..."
            ) : report ? (
              <div>
                <p><strong>Plagiarism Score:</strong> {report.result?.score}%</p>
                <p><strong>Sources Found:</strong> {report.result?.sourceCounts}</p>
                <ul className="mt-2 list-disc ml-5">
                  {report.sources?.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title || source.url}
                      </a>{" "}
                      — {source.plagiarismWords} words matched
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              "No report yet."
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCheck}
          className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-950 transition font-medium"
        >
          Check Plagiarism
        </button>
      </div>
    </div>
  );
}
