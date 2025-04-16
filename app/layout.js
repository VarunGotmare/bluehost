"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";

import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import SidebarLayout from "@/components/SidebarLayout";
import Footer from "@/components/Footer";
import HoverBar from "@/components/HoverBar"; // ✅ import HoverBar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isHomePage = pathname === "/";

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased h-full w-full overflow-y-auto`}
      >
        <UserProvider>
          {!isAuthRoute ? (
            <SidebarLayout>{children}</SidebarLayout>
          ) : (
            <div className="flex h-screen w-full overflow-hidden">
              <main className="flex-1 h-full overflow-y-auto">{children}</main>
            </div>
          )}

          {/* ✅ Show HoverBar only on non-login/register routes */}
          {!isAuthRoute && <HoverBar />}

          {/* ✅ Show Footer only on homepage */}
          {isHomePage && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
