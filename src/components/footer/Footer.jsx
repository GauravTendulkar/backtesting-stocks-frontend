"use client";

import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Left Section - Brand */}
                <div className="text-lg font-semibold">
                    <Link href="/" className="hover:text-gray-400">
                        Backtesting App
                    </Link>
                </div>

                {/* Center Section - Links */}
                <nav className="flex space-x-6">
                    <Link href="/about-us" className="hover:text-gray-400">
                        About
                    </Link>
                    <Link href="/contact-us" className="hover:text-gray-400">
                        Contact
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-gray-400">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-gray-400">
                        Terms of Service
                    </Link>
                </nav>

                {/* Right Section - Socials (Optional) */}
                {/* <div className="flex space-x-4">
                    <a
                        href="https://github.com/your-github"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/your-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://twitter.com/your-twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        Twitter
                    </a>
                </div> */}
            </div>

            {/* Bottom Section - Copyright */}
            <div className="mt-4 text-center text-sm text-gray-400">
                © {currentYear} Backtesting App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
