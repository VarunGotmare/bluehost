"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "@/context/UserContext";
import { User } from "lucide-react";

export default function NavbarLayout({ children }) {
    const pathname = usePathname();
    const { logout } = useContext(UserContext);
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (isAuthRoute) return <>{children}</>;

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {/* Top Navbar - Fixed */}
            <Navbar />

            {/* Main content, with padding-top to offset fixed navbar */}
            <main className="flex-1 p-4 pt-20">{children}</main>
        </div>
    );
}

function Navbar() {
    const pathname = usePathname(); // Get the current route
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to toggle profile menu
    const { logout } = useContext(UserContext);
    const menuRef = useRef(null); // Reference to the profile menu

    // Close the profile menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        // Add event listener for click outside
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setIsProfileMenuOpen((prev) => !prev); // Toggle the profile menu visibility
    };

    const handleLogout = () => {
        logout(); // Call logout function from UserContext
        setIsProfileMenuOpen(false); // Close the menu after logout
    };

    return (
        <nav className="h-16 w-full flex items-center justify-between px-6 bg-white border-b border-[#d1d9e6] fixed top-0 left-0 right-0 z-10">
            {/* Left: Branding */}
            <h1
                className="text-xl text-blue-600"
                style={{ fontFamily: "var(--font-pacifico)" }}
            >
                BlueHost
            </h1>

            {/* Center: Navigation Links */}
            <div className="flex items-center space-x-6">
                <Link
                    href="/"
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg ${
                        pathname === "/" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                    }`}
                >
                    Home
                </Link>
                <Link
                    href="/tools"
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg ${
                        pathname === "/tools" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                    }`}
                >
                    Tools
                </Link>
                <Link
                    href="/whats-new"
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg ${
                        pathname === "/whats-new" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                    }`}
                >
                    What's New
                </Link>
                <Link
                    href="/about"
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg ${
                        pathname === "/about" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                    }`}
                >
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg ${
                        pathname === "/contact" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                    }`}
                >
                    Contact
                </Link>
            </div>

            {/* Right: Profile Icon */}
            <div className="flex items-center relative">
                <button
                    onClick={handleProfileClick}
                    className={`hover:text-gray-500 px-3 py-2 rounded-lg`}
                >
                    <User className="h-6 w-6" />
                </button>

                {/* Profile Menu */}
                {isProfileMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 bg-white border shadow-lg rounded-lg w-40"
                        style={{ top: "100%" }} // Add this to ensure it's below the profile button
                    >
                        <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {}}
                        >
                            Profile
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={handleLogout} // Logout Button
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
