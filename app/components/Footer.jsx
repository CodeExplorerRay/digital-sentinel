"use client";
import React from 'react';
import Image from 'next/image';

/**
 * The main footer component for the application.
 */
export default function Footer() {
    /**
     * Tracks the 'Buy Me a Coffee' link click event using Plausible analytics.
     */
    const trackCoffeeClick = () => {
        if (window.plausible) {
            window.plausible('Buy Me a Coffee');
        }
    };

    /**
     * Opens a social media share dialog.
     * @param {'twitter' | 'linkedin' | 'facebook'} platform - The social media platform.
     */
    const handleShare = (platform) => {
        const url = encodeURIComponent('https://www.digital-sentinel.com');
        const text = encodeURIComponent('Check out Digital Sentinel for free, privacy-first security tools! 🛡️');
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };
        window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
    };

    return (
        <footer id="footer" className="bg-dark-bg mt-12 py-12 border-t border-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
                    {/* Company Info */}
                    <div className="col-span-2 md:col-span-1">
                        <a href="/" className="flex items-center mb-4">
                            <Image
                                src="/Images/logo.png"
                                alt="Digital Sentinel Logo"
                                width={32}
                                height={32}
                            />
                            <h3 className="ml-2 text-xl font-bold text-logo-cyan">Digital <span className="text-text-main">Sentinel</span></h3>
                        </a>
                        <p className="text-text-secondary text-sm">Free security utilities for the digital age.</p>
                        {/* Coffee link in footer */}
                        <div className="mt-4">
                            <a 
                            href="https://buymeacoffee.com/digitalsentinel"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={trackCoffeeClick}
                            className="inline-flex items-center text-text-secondary hover:text-yellow-400 text-sm transition duration-150"
                            >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                            </svg>
                            Buy us a coffee
                            </a>
                        </div>
                    </div>
               
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-main mb-4">Free Tools</h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/#tools">Password Analyzer</FooterLink>
                            <FooterLink href="/#tools">Password Generator</FooterLink>
                            <FooterLink href="/#resources">Resources</FooterLink>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="text-lg font-semibold text-main mb-4">Community</h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/about">About </FooterLink>
                            <FooterLink href="https://github.com/CodeExplorerRay/digital-sentinel" isExternal>Contribute (GitHub)</FooterLink>
                            <FooterLink href="/legal/security-disclosures">Security Disclosures</FooterLink>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-main mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/legal/privacy-policy">Privacy Policy</FooterLink>
                            <FooterLink href="/legal/terms-of-use">Terms of Use</FooterLink>
                            <FooterLink href="/legal/cookie-policy">Cookie Policy</FooterLink>
                            <FooterLink href="/legal/license">License</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Copyright and Social Media */}
                <div className="mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary border-t border-secondary/30">
                    <p>&copy; 2025 Digital Sentinel. Built for the community, 100% Free.</p>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <span className="text-main">Spread the word:</span>
                        <button onClick={() => handleShare('twitter')} className="text-text-secondary hover:text-white transition duration-150" aria-label="Share on X">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </button>
                        <a href="https://github.com/CodeExplorerRay/digital-sentinel" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition duration-150" aria-label="Github">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <button onClick={() => handleShare('linkedin')} className="text-text-secondary hover:text-white transition duration-150" aria-label="Share on LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * A styled link component specifically for use within the footer.
 * Handles internal and external links.
 * @param {{
 *   href: string;
 *   children: React.ReactNode;
 *   isExternal?: boolean;
 * }} props
 */
const FooterLink = ({ href, children, isExternal = false }) => (
    <li>
        <a
            href={href}
            className="text-text-secondary hover:text-accent transition duration-150"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    </li>
);
