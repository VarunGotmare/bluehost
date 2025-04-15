// components/Footer.tsx
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-100 via-white to-blue-50 text-blue-900 py-16 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-sm mb-4 text-gray-700 leading-relaxed">
              Harnessing AI to improve your content creation process — making text summarization, paraphrasing, and more easily accessible.
            </p>
            <Link href="/about" className="text-blue-700 hover:text-blue-900 text-sm">
              Learn More
            </Link>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-blue-700 hover:text-blue-900 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-700 hover:text-blue-900 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                className="p-3 bg-blue-200 hover:bg-blue-300 rounded-full transition duration-300"
              >
                <Facebook size={24} className="text-blue-800" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="p-3 bg-blue-200 hover:bg-blue-300 rounded-full transition duration-300"
              >
                <Linkedin size={24} className="text-blue-800" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="p-3 bg-blue-200 hover:bg-blue-300 rounded-full transition duration-300"
              >
                <Instagram size={24} className="text-blue-800" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-blue-800">
            © {new Date().getFullYear()} BlueHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
