"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { User, FileText, Clipboard, Edit, Text } from "lucide-react";

export default function SidebarLayout({ children }) {
    const pathname = usePathname();
    const { logout } = useContext(UserContext);
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (isAuthRoute) return <>{children}</>;

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {/* Top Navbar - Fixed */}
            <Navbar />

            <div className="flex flex-1 mt-16"> {/* Add margin to avoid overlap with navbar */}
                {/* Sidebar under the navbar - Fixed */}
                <aside className="w-20 p-2 border-r border-[#d1d9e6] bg-white flex flex-col items-center fixed top-16 bottom-0 left-0">
                    <nav className="space-y-6 mt-4">
                        <NavIconItem
                            href="/paraphrase"
                            label="Paraphrase"
                            Icon={<Edit size={20} />}
                            active={pathname === "/paraphrase"}
                        />
                        <NavIconItem
                            href="/grammar-check"
                            label="Grammar Check"
                            Icon={<Clipboard size={20} />}
                            active={pathname === "/grammar-check"}
                        />
                        <NavIconItem
                            href="/plagiarism-check"
                            label="Plagiarism Check"
                            Icon={<FileText size={20} />}
                            active={pathname === "/plagiarism-check"}
                        />
                        <NavIconItem
                            href="/summarize"
                            label="Summarize"
                            Icon={<Text size={20} />}
                            active={pathname === "/summarize"}
                        />

                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-4 ml-20 overflow-auto">{children}</main> {/* Adjusted margin-left */}
            </div>
        </div>
    );
}

function NavIconItem({ href, label, Icon, active }) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center text-center transition-all hover:text-blue-600 ${active ? "text-blue-600" : "text-gray-600"
                }`}
        >
            <div
                className={`p-2 rounded-md ${active ? "bg-blue-100" : "hover:bg-blue-50"
                    }`}
            >
                {Icon}
            </div>
            <span className="text-[10px] mt-1">{label}</span>
        </Link>
    );
}

function Navbar() {
    return (
        <nav className="h-16 w-full flex items-center justify-between px-6 bg-white border-b border-[#d1d9e6] fixed top-0 left-0 right-0 z-10">
            {/* Left: BlueHost Branding */}
            <h1
                className="text-xl text-blue-600"
                style={{ fontFamily: "var(--font-pacifico)" }}
            >
                BlueHost
            </h1>

            {/* Right: Links */}
            <div className="flex items-center space-x-6">
                <Link href="/about" className="hover:text-gray-500">
                    About Us
                </Link>
                <Link href="/contact" className="hover:text-gray-500">
                    Contact
                </Link>
                <Link href="/profile" className="hover:text-gray-500">
                    <User className="h-6 w-6" />
                </Link>
            </div>
        </nav>
    );
}
