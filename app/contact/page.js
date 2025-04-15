"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="px-6 md:px-20 py-16 max-w-4xl mx-auto space-y-16">
            {/* Logo + Heading */}
            <div className="text-center space-y-2">
                <h1
                    className="text-5xl sm:text-6xl font-bold text-blue-600"
                    style={{ fontFamily: "var(--font-pacifico)" }}
                >
                    BlueHost
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Get in touch — we’d love to hear from you!
                </p>
            </div>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-8 text-gray-700">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="text-blue-600 w-6 h-6" />
                        <span>support@bluehost.ai</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="text-blue-600 w-6 h-6" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin className="text-blue-600 w-6 h-6" />
                        <span>Pune, Maharashtra, India</span>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Your Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Message</label>
                        <textarea
                            rows={4}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                    >
                        <Send className="w-4 h-4" />
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
