"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

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
        body: JSON.stringify({ text: inputText, level: "medium" }),
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
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left side – Logo and Description */}
        <div className="text-left space-y-8">
  <h1
    className="text-5xl sm:text-6xl font-bold text-blue-600"
    style={{ fontFamily: "var(--font-pacifico)" }}
  >
    BlueHost
  </h1>
  <p className="text-2xl text-gray-700 leading-relaxed">
    BlueHost empowers you with cutting-edge AI tools to effortlessly summarize, paraphrase, and elevate your content — ensuring clarity, precision, and creativity in every word.
  </p>
  <a
    href="/tools"
    className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl shadow-lg"
  >
    🚀 Explore Tools
  </a>
</div>


        {/* Right side – Textbox and Button inside a Card */}
        <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-blue-200 rounded-3xl p-10 shadow-2xl transition-all duration-300">
          <label className="block text-2xl font-semibold text-gray-800 mb-4">
            Enter text to summarize:
          </label>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-52 p-6 rounded-xl bg-white border border-gray-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder-gray-400 resize-none text-lg"
            placeholder="Paste or write your content here..."
          />

          <button
            onClick={handleSummarize}
            className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-800 to-blue-900 text-white font-bold text-lg shadow-md hover:from-blue-900 hover:to-blue-950 transform hover:scale-[1.02] transition-all duration-300"
          >
            ✨ Summarize
          </button>

          {summary !== "" && (
            <div className="mt-8 p-6 bg-white border border-blue-200 rounded-xl shadow-sm">
              <p className="font-semibold text-gray-700 mb-2 text-xl">Summary:</p>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">{summary}</p>
            </div>
          )}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full max-w-7xl py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-10">
          AI Summarizer Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <FeatureCard
            title="Faster Summarization"
            desc="Instantly generate concise summaries from long articles, reports, or essays, drastically reducing your reading time while ensuring you still grasp the key points."
            imgSrc="/faster-summarization.png"
          />
          <FeatureCard
            title="Context-Aware"
            desc="Our summarizer uses advanced AI to understand the meaning and context behind the text, ensuring the output stays relevant and retains critical information and tone."
            imgSrc="/context-aware.png"
          />
          <FeatureCard
            title="Customizable Summarization"
            desc="Choose your level of summarization — whether you need a short snippet, a paragraph summary, or a detailed bullet list, tailor the output to fit your workflow."
            imgSrc="/customizable-summarization.png"
          />
          <FeatureCard
            title="Originality Protection"
            desc="Ensure your rewritten or summarized text is completely original. With a powerful plagiarism detector integrated, get real-time feedback and stay ethically sound."
            imgSrc="/originality-protection.png"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, imgSrc }) {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-6">
      {/* Left: Image without blue background */}
      <div className="flex items-center justify-center">
        <Image
          src={imgSrc}
          alt={title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Right: Title and Description */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-[#1a3b5d] mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{desc}</p>
      </div>
    </div>
  );
}
