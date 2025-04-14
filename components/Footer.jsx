// components/Footer.tsx
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from 'lucide-react'; // Import lucide icons

export default function Footer() {
    return (
        <footer className="w-full bg-gray-200 text-white py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div >
                        <h3 className="text-xl font-semibold mb-4 text-black">About</h3>
                        <p className="text-sm mb-4 text-gray-800">
                            Harnessing AI to improve your content creation process, making text summarization, paraphrasing, and more easily accessible.
                        </p>
                        <Link href="/about" className="text-black hover:text-blue-300 text-sm">
                            Learn More
                        </Link>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-black">Support</h3>
                        <ul>
                            <li>
                                <Link href="/support" className="text-blue-500 hover:text-blue-300 text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-blue-500 hover:text-blue-300 text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-black">Connect</h3>
                        <div className="flex gap-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="p-3 bg-blue-50 rounded-full text-blue-600 hover:text-blue-400"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                className="p-3 bg-blue-50 rounded-full text-blue-600 hover:text-blue-400"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                className="p-3 bg-blue-50 rounded-full text-blue-600 hover:text-blue-400"
                            >
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-black">
                        © {new Date().getFullYear()} BlueHost. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
