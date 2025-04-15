"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, Lightbulb, GraduationCap, ShieldCheck, RefreshCw, MessageCircle } from "lucide-react";

const tools = [
    {
        title: "Text Summarization",
        image: "/summarization-card.png",
        color: "text-pink-600",
        iconColor: "bg-pink-600",
        points: [
            { icon: <FileText />, text: "Quickly condense lengthy texts" },
            { icon: <Lightbulb />, text: "Extract key points and insights" },
            { icon: <GraduationCap />, text: "Ideal for research & studying" },
        ],
        link: "/summarize",
    },
    {
        title: "Plagiarism Checker",
        image: "/plagiarism-card.png",
        color: "text-blue-600",
        iconColor: "bg-blue-600",
        points: [
            { icon: <ShieldCheck />, text: "Detect duplicate content" },
            { icon: <FileText />, text: "Ensure content originality" },
            { icon: <GraduationCap />, text: "Protect your intellectual work" },
        ],
        link: "/plagiarism-check",
    },
    {
        title: "Text Paraphrasing",
        image: "/paraphrasing-card.png",
        color: "text-green-600",
        iconColor: "bg-green-600",
        points: [
            { icon: <RefreshCw />, text: "Rephrase with clarity and accuracy" },
            { icon: <ShieldCheck />, text: "Maintain original intent" },
            { icon: <MessageCircle />, text: "Choose your desired tone" },
        ],
        link: "/paraphrase",
    },
];

export default function Page() {
    return (
        <div className="p-6 space-y-20">
            {tools.map((tool, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-10 p-8"
                >
                    <div className="relative">
                        <Image
                            src={tool.image}
                            alt={tool.title}
                            width={400}
                            height={400}
                            className="shadow-lg rounded-xl"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">{tool.title}</h2>
                        <ul className="space-y-2">
                            {tool.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                    <span className={tool.color}>{point.icon}</span>
                                    <span>{point.text}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href={tool.link} className={`inline-block mt-4 px-5 py-2.5 ${tool.iconColor} text-white text-sm font-medium rounded-full hover:bg-opacity-80 transition-all shadow-md`}>
                            Use for Free
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
