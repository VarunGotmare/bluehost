"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { FileText, Edit, Search, Code } from "lucide-react"; // Icons added
import Link from "next/link";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const handleSummarize = async () => {
    setSummary("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, level: "medium" }), // Default level set to "medium"
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
      console.error("Streaming error:", err);
      setSummary("Something went wrong while summarizing.");
    }
};

  





  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 sm:px-10 py-10 gap-10">
      {/* Main Section: Intro + Summarization */}
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left side – Intro + Textarea Card */}
        <div className="text-left space-y-8">
          <div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-blue-600"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              BlueHost
            </h1>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">
              Harness the power of AI to summarize, paraphrase, and enhance your text with precision.
            </p>
          </div>

          {/* Textbox and Button inside a Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Enter your text to summarize:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste or write your content here..."
            />
            <button
              onClick={handleSummarize}
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Summarize
            </button>

            {summary !== "" && (
              <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-700 mb-1">Summary:</p>
                <p className="text-gray-800 whitespace-pre-line">{summary}</p>
              </div>
            )}

          </div>
        </div>

        {/* Right side – Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          <FeatureCard
            title="Smart Summarization"
            desc="Condenses long articles into short, digestible summaries using cutting-edge NLP."
            icon={<FileText size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="Intelligent Paraphrasing"
            desc="Rewrites content while preserving its original meaning and context."
            icon={<Edit size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="High Accuracy"
            desc="Built with state-of-the-art language models that ensure reliable results."
            icon={<Search size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="API Powered"
            desc="Fast and scalable summarization with API integration for developers and students."
            icon={<Code size={32} className="text-blue-600" />}
          />
        </div>
      </section>

      {/* AI Summarizer Highlights Section */}
      <section className="w-full max-w-7xl py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-10">
          AI Summarizer Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Faster Summarization"
            desc="Summarize content in a fraction of the time it takes to read it."
            icon={<FileText size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="Context-Aware"
            desc="Summarization that understands the context for more accurate results."
            icon={<Search size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="Easy Integration"
            desc="Easily integrate summarization features into your apps with our API."
            icon={<Code size={32} className="text-blue-600" />}
          />
        </div>
      </section>

      {/* How to Summarize Text? Section */}
      <section className="w-full max-w-7xl py-20 ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-10">
          How to Summarize Text?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Step 1: Input Text"
            desc="Paste or write the text you want to summarize in the provided textbox."
            icon={<Edit size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="Step 2: Click Summarize"
            desc="Press the 'Summarize' button to generate the summary of your text."
            icon={<Search size={32} className="text-blue-600" />}
          />
          <FeatureCard
            title="Step 3: Receive Summary"
            desc="Get your summarized text instantly, ready to be used or shared."
            icon={<FileText size={32} className="text-blue-600" />}
          />
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-left">
      <div className="flex flex-row items-center space-x-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
      </div>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  );
}
