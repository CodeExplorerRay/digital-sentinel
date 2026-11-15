"use client";
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

/**
 * Layout component wraps the main content with the Header and Footer.
 */
export default function Layout({ children }) {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isBannerMounted, setIsBannerMounted] = useState(false);
    const bannerRef = useRef(null);

    useEffect(() => {
        // Trigger the animation shortly after the component mounts
        const timer = setTimeout(() => {
            setIsBannerMounted(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (!isBannerVisible && bannerRef.current) {
        // When banner is dismissed, we can remove it from the DOM after the animation
        // to prevent it from taking up space.
        setTimeout(() => {
            if (bannerRef.current) bannerRef.current.style.display = 'none';
        }, 500); // Match the transition duration
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Privacy-friendly analytics by Plausible */}
            <Script
                async
                src="https://plausible.io/js/pa-zbjLWSgoLlWNPQqBEtqo3.js"
                data-domain="localhost"
                strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
                {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}}; plausible.init() `}
            </Script>

            {/* CTA Banner */}
            <div ref={bannerRef} className={`bg-accent text-primary text-center py-2 px-4 font-semibold transition-all duration-500 ease-out ${isBannerMounted && isBannerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="relative max-w-7xl mx-auto flex items-center justify-center">
                    <a href="#tools" className="hover:underline">
                        🎉 New: Dark Web Exposure Scanner is now live! Check it out &rarr;
                    </a>
                    <button
                        onClick={() => setIsBannerVisible(false)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/20 transition"
                        aria-label="Dismiss banner"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
