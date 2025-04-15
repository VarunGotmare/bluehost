"use client";
import Link from "next/link";
import { FileText, Lightbulb, ShieldCheck, RefreshCw, Star } from "lucide-react";

const newFeatures = [
  {
    title: "Enhanced Grammar Suggestions",
    description: "Our grammar suggestions are now smarter and more accurate, helping you refine your content with ease.",
    icon: <FileText />,
  },
  {
    title: "Context-Aware Fixes",
    description: "Grammar check now considers context, ensuring more relevant suggestions and improvements.",
    icon: <Lightbulb />,
  },
  {
    title: "Tone and Style Adjustments",
    description: "You can now adjust the tone and style of your writing with precise grammar suggestions based on your preferred voice.",
    icon: <ShieldCheck />,
  },
  {
    title: "Faster Processing",
    description: "Experience faster grammar checks with optimized processing, saving you time on large documents.",
    icon: <RefreshCw />,
  },
  {
    title: "Real-time Feedback",
    description: "Get real-time feedback as you write, allowing for immediate grammar improvements and suggestions.",
    icon: <Star />,
  },
];

export default function WhatsNewPage() {
  return (
    <div className="p-6 space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">What's New in Grammar Check</h1>
        <p className="text-xl text-gray-600">
          We're excited to bring you the latest updates to our Grammar Check tool, designed to make your writing more polished and accurate.
        </p>
      </div>

      <div className="space-y-12">
        {newFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-6">
            <div className="text-blue-600 text-3xl">{feature.icon}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-700 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/grammar-check"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all shadow-md"
        >
          Try the New Grammar Check Tool
        </Link>
      </div>
    </div>
  );
}
