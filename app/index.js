"use client";
import React, { useState } from "react";
import ToolSwitcher from "@/components/ToolSwitcher";

// ==============================
// Analytics / Affiliate Tracking
// ==============================
const trackAffiliateClick = (productName, category) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      'event_category': category,
      'event_label': productName,
      'value': 1
    });
  }
};

const trackCoffeeClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('event', 'coffee_click', {
      'event_category': 'support',
      'event_label': 'buy_me_coffee'
    });
  }
};

// ==============================
// Hero Section
// ==============================
const HeroSection = () => (
  <section id="hero" className="py-20 md:py-28 bg-dark-bg text-text-main shadow-inner">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
        Instantly Audit Your Digital Security. <span className="text-accent">100% Free.</span>
      </h1>
      <p className="mt-3 max-w-3xl mx-auto text-xl text-text-secondary">
        Digital Sentinel provides fast, private, and powerful tools to check
        your password health and <strong>detect dark web exposure</strong> — no accounts, no cost, ever.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="#tools"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-xl text-primary bg-accent hover:bg-green-400 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Launch Password Analyzer
        </a>
        <a
          href="#tools"
          className="inline-flex items-center justify-center px-8 py-3 border border-accent text-base font-medium rounded-lg shadow-xl text-accent bg-transparent hover:bg-accent/10 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Generate Secure Pass
        </a>
      </div>
    </div>
  </section>
);

// ==============================
// Resource Links
// ==============================
const ResourceLinks = () => (
  <section id="resources" className="py-16 bg-dark-bg border-t border-secondary/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-accent font-semibold uppercase tracking-wider">
          Maintain Your Security Posture
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-text-main sm:text-4xl">
          Recommended Free & Trusted Services
        </h2>
        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
          We don't sell software, but we strongly recommend these essential
          third-party tools to secure your new passwords.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Password Managers */}
        <EnhancedResourceCard
          title="Top-Rated Password Managers"
          description="Use an encrypted vault to safely store and auto-fill your complex passwords across all devices."
          iconColor="text-accent"
          iconPath="M15 7a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6z"
          category="password_managers"
          links={[
            { name: "1Password", href: "https://1password.com" },
            { name: "Bitwarden", href: "https://bitwarden.com" },
            { name: "LastPass", href: "https://www.lastpass.com" },
          ]}
        />

        {/* Multi-Factor Authenticators */}
        <EnhancedResourceCard
          title="Free Multi-Factor Authenticators"
          description="Add a critical second layer of defense. Protect your accounts even if your password is stolen."
          iconColor="text-accent"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          category="authenticators"
          links={[
            { name: "Microsoft Authenticator", href: "https://www.microsoft.com/en-us/security/mobile-authenticator-app" },
            { name: "Google Authenticator", href: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" },
            { name: "Authy", href: "https://authy.com" },
          ]}
        />

        {/* VPN / Encrypted Browsing */}
        <EnhancedResourceCard
          title="VPN / Encrypted Browsing"
          description="Encrypt your internet traffic to prevent man-in-the-middle attacks, especially on public Wi-Fi."
          iconColor="text-accent"
          iconPath="M21 12a9 9 0 01-9 9m-9-9a9 9 0 019-9m-9 9h9m-9 0l5 5m-5-5l5-5"
          category="vpn_services"
          links={[
            { name: "ProtonVPN", href: "https://protonvpn.com" },
            { name: "NordVPN", href: "https://nordvpn.com" },
            { name: "Mullvad VPN", href: "https://mullvad.net/en/" },
          ]}
        />
      </div>

      <p className="text-gray-500 text-center text-sm mt-8">
        *Digital Sentinel earns a small commission through these affiliate links at no extra cost to you. This directly supports our free tool development.
      </p>
    </div>
  </section>
);

// ==============================
// Newsletter Signup
// ==============================
const NewsletterSignup = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements["email-input"].value;

    if (email && email.includes("@")) {
      setMessage({
        text: `Success! Your Sentinel Alerts will be sent to ${email}. Check your spam folder!`,
        isError: false,
      });
      event.target.reset();

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          'event_category': 'engagement',
          'event_label': 'homepage_newsletter'
        });
      }
    } else {
      setMessage({
        text: "Please enter a valid email address.",
        isError: true,
      });
    }
  };

  return (
    <section id="subscribe" className="py-20 bg-secondary/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
          Join the Sentinel Alert Network
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Get critical, non-spam cybersecurity threat reports and best practice
          guides delivered monthly.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              id="email-input"
              name="email-input"
              placeholder="Enter your email for security alerts"
              required
              className="w-full px-5 py-3 border border-secondary/50 rounded-lg text-text-main bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              aria-label="Email address for subscription"
            />
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-6 py-3 border border-transparent rounded-lg shadow-md text-primary bg-accent hover:bg-green-400 transition duration-150 ease-in-out font-semibold"
            >
              Subscribe for Alerts
            </button>
          </div>
          {message.text && (
            <p className={`mt-4 text-sm font-medium ${message.isError ? "text-red-400" : "text-text-main"}`}>
              {message.text}
            </p>
          )}
        </form>

        <div className="mt-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-text-main text-xs">
            <strong>Enjoying our free tools?</strong> Consider supporting us with a coffee to help with hosting costs.{" "}
            <a 
              href="https://buymeacoffee.com/digitalsentinel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCoffeeClick}
              className="text-accent hover:underline font-semibold"
            >
              Buy us a coffee ☕
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};


// ==============================
// Enhanced Resource Card
// ==============================
const EnhancedResourceCard = ({ title, description, iconColor, iconPath, category, links }) => (
  <div className="p-6 bg-card-bg rounded-lg shadow-2xl border border-secondary/30 hover:border-accent/30 transition duration-300">
    <div className="flex items-start">
      <svg className={`h-8 w-8 ${iconColor} flex-shrink-0 mr-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
      <div>
        <h3 className="text-xl font-bold text-main mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-3">{description}</p>
        <div className="text-text-secondary text-sm">
          {links.map(link => (
            <p key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
                onClick={() => trackAffiliateClick(link.name, category)}
              >
                {link.name}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ==============================
// Value Proposition Section
// ==============================
const Card = ({ title, iconPath, children }) => (
  <div className="p-6 bg-card-bg rounded-lg shadow-2xl border border-secondary/30 hover:border-accent/30 transition duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/20 text-accent mb-4">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-main mb-3">{title}</h3>
    <p className="text-text-secondary">{children}</p>
  </div>
);

const ValueProposition = () => (
  <section id="purpose" className="py-16 bg-dark-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-accent font-semibold uppercase tracking-wider">
          How We Serve The Community
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-text-main sm:text-4xl">
          Our Pledge: Free, Simple, and Effective Security
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        <Card
          title="Community-Driven Utility"
          iconPath="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        >
          We focus on providing specific, powerful tools without the complexity
          of a full SaaS platform. Use what you need, when you need it, for free.
        </Card>

        <Card
          title="Zero User Data Collection"
          iconPath="M13.875 18.828c-1.897.126-3.834.02-5.736-.316A11.972 11.972 0 015.352 14.7c-1.528-1.543-2.574-3.5-3.048-5.597.474-2.097 1.52-4.054 3.048-5.597a11.972 11.972 0 012.787-2.712c1.898-.336 3.835-.436 5.736-.316a12.022 12.022 0 015.59 2.046l-2.097 2.097-1.414-1.414zM16 12a4 4 0 11-8 0 4 4 0 018 0z"
        >
          Your passwords and queries are never logged, stored, or sent to our
          servers. We value trust above all else. <strong>What happens on your screen stays on your screen.</strong>
        </Card>

        <Card
          title="Curated Security Resources"
          iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
        >
          We guide users to the best third-party password managers, authenticators, and VPNs that meet high-security standards. 
          <span className="block mt-2 text-accent text-sm font-semibold">Your purchases help keep our tools free.</span>
        </Card>
      </div>
    </div>
  </section>
);

// ==============================
// App Component
// ==============================
export default function App() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <ToolSwitcher />
      <ResourceLinks />
      <NewsletterSignup />
    </>
  );
}
