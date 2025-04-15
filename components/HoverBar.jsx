"use client";
import { FileText, FileCheck, FileSearch, Edit } from "lucide-react"; // Import Lucide icons
import Link from "next/link"; // Import Link component from Next.js for navigation

export default function HoverBar() {
    // Define the links for tools along with their icons (from Lucide)
    const toolsLinks = [
        { name: "Grammar Checker", href: "/grammar-check", icon: <FileText size={24} /> },
        { name: "Plagiarism Checker", href: "/plagiarism-check", icon: <FileCheck size={24} /> },
        { name: "Summarizer", href: "/summarize", icon: <FileSearch size={24} /> },
        { name: "Paraphrase", href: "/paraphrase", icon: <Edit size={24} /> },
    ];

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 w-32 bg-white text-gray-900 rounded-2xl shadow-xl p-4 space-y-6 transition-all z-50">
            {/* Title */}
            <div className="text-xxs font-semibold text-center mb-4 text-blue-900 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                Tools
            </div>
            {/* Tool List */}
            <div className="flex flex-col items-center space-y-4 w-full">
                {toolsLinks.map((tool, index) => (
                    <Link
                        key={index}
                        href={tool.href}
                        className="flex flex-col items-center text-xxs hover:text-yellow-400 transition-all focus:outline-none w-full overflow-hidden"
                    >
                        {/* Icon with color */}
                        <div className="mb-1 text-blue-500 hover:text-blue-700 transition-all">
                            {tool.icon}
                        </div>
                        {/* Tool Name with ellipsis overflow */}
                        <span className="text-gray-700 hover:text-blue-900 transition-all text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            {tool.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
