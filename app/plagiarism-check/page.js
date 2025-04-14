"use client";
import { useState } from "react";

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
        <div className="flex justify-center items-center min-h-screen bg-white py-10">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-4/5 lg:w-3/4 xl:w-2/3">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    AI Plagiarism Checker
                </h1>

                <div className="flex gap-6 mb-6">
                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                            Enter Text to Check
                        </label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-72 p-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Paste or write your content here..."
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                            Plagiarism Report
                        </label>
                        <div className="w-full h-72 p-6 overflow-auto border border-gray-300 rounded-2xl bg-gray-50 text-sm text-gray-700">
                            {loading ? (
                                "Checking..."
                            ) : report ? (
                                <div>
                                    <p><strong>Plagiarism Score:</strong> {report.result?.score}%</p>
                                    <p><strong>Sources Found:</strong> {report.result?.sourceCounts}</p>
                                    <ul className="mt-2 list-disc ml-5">
                                        {report.sources?.map((source, index) => (
                                            <li key={index}>
                                                <a href={source.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                                    {source.title || source.url}
                                                </a> — {source.plagiarismWords} words matched
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

                <div className="flex justify-center">
                    <button
                        onClick={handleCheck}
                        className="mt-4 w-48 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Check Plagiarism
                    </button>
                </div>
            </div>
        </div>
    );
}
