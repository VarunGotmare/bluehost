"use client";

import { Users, Target, Code2, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-6 md:px-20 py-16 space-y-16 max-w-5xl mx-auto">
      {/* Logo and Creation Info */}
      <div className="text-center space-y-2">
        <h1
          className="text-5xl sm:text-6xl font-bold text-blue-600"
          style={{ fontFamily: "var(--font-pacifico)" }}
        >
          BlueHost
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          This website was created in 2025 to empower your writing experience.
        </p>
      </div>

      {/* About Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h2>
        <p className="text-lg md:text-xl text-gray-600">
          We’re on a mission to make writing tools smarter, cleaner, and genuinely useful.
        </p>
      </div>

      {/* Content Sections */}
      <section className="space-y-10">
        <div className="flex items-start gap-6">
          <Users className="text-blue-600 w-8 h-8" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Who We Are</h3>
            <p className="text-gray-700 mt-2">
              A team of creative devs and designers building seamless AI-powered writing tools — made for students, writers, and professionals alike.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Target className="text-pink-600 w-8 h-8" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-700 mt-2">
              To help you write better, faster, and smarter — without compromising your unique voice.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Code2 className="text-green-600 w-8 h-8" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Tech Meets Creativity</h3>
            <p className="text-gray-700 mt-2">
              We combine sleek UX with powerful AI to make every feature feel effortless and intuitive.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Rocket className="text-yellow-600 w-8 h-8" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Always Evolving</h3>
            <p className="text-gray-700 mt-2">
              We actively improve based on real user feedback, so you’re always getting the best version of our tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
