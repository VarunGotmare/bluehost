"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";

import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import SidebarLayout from "@/components/SidebarLayout"; // Import SidebarLayout
import Footer from "@/components/Footer"; // Import Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login" || pathname === "/register"; // Check for auth routes
  const isHomePage = pathname === "/"; // Check if it's the home page

  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased h-full w-full overflow-y-auto`}>
        <UserProvider>
          {/* Only show SidebarLayout on non-login, non-register pages */}
          {!isAuthRoute ? (
            <SidebarLayout>{children}</SidebarLayout> // Use SidebarLayout for content
          ) : (
            <div className="flex h-screen w-full overflow-hidden">
              <main className="flex-1 h-full overflow-y-auto">{children}</main> {/* Only children for login and register */}
            </div>
          )}

          {/* Footer will only be visible on the Home page */}
          {isHomePage && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
