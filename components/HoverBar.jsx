"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, X, TextQuote, PenLine, SpellCheck, CopyCheck } from "lucide-react";

export default function HoverBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hoverBarRef = useRef(null); // Reference to the HoverBar container

  const excludedRoutes = ["/login", "/register"];
  if (excludedRoutes.includes(pathname)) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);

    const handleClickOutside = (e) => {
      if (hoverBarRef.current && !hoverBarRef.current.contains(e.target)) {
        setIsOpen(false); // Close the HoverBar if click is outside
      }
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, []);

  const tools = [
    { icon: TextQuote, label: "Summarizer", route: "/summarize" },
    { icon: PenLine, label: "Paraphraser", route: "/paraphrase" },
    { icon: SpellCheck, label: "Grammar", route: "/grammar-check" },
    { icon: CopyCheck, label: "Plagiarism", route: "/plagiarism-check" },
  ];

  const handleToolClick = (route) => {
    router.push(route);
    setIsOpen(false);
  };

  return (
    <div ref={hoverBarRef} className="fixed bottom-6 left-6 z-50 flex flex-col items-start space-y-3">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="bg-white border shadow-xl rounded-2xl p-3 space-y-4 w-24 mb-2"
          >
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center text-xs text-gray-700 hover:text-blue-600 cursor-pointer transition"
                onClick={() => handleToolClick(tool.route)}
              >
                <tool.icon size={22} />
                <span className="mt-1">{tool.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        layout
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <Wrench size={24} />}
      </motion.button>
    </div>
  );
}
