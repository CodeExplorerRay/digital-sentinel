"use client";
import React from "react";

const AboutSection = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="space-y-4 text-gray-600">{children}</div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">About Digital Sentinel</h1>
          <p className="mt-2 text-sm text-gray-500">Empowering digital safety, one user at a time.</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <AboutSection title="Our Philosophy">
            <p>
              <strong>Digital Sentinel</strong> was founded on a simple idea: cybersecurity
              shouldn’t be complicated or intimidating. Everyone deserves access to practical,
              privacy-respecting tools that help them stay safe online — without requiring
              advanced technical knowledge.
            </p>
            <p>
              This platform is designed with a <strong>“privacy-by-design”</strong> approach.
              Everything you use here — from password analysis to AI-driven security advice —
              runs locally in your browser. No data leaves your device.
            </p>
          </AboutSection>

          <AboutSection title="How It Works">
            <p>
              Every tool within Digital Sentinel is engineered to prioritize transparency and
              user control. The password analyzer and generator, for instance, operate
              entirely client-side, ensuring no sensitive data is transmitted or stored.
            </p>
            <p>
              Our integrated AI advisor uses local processing via <strong>Ollama</strong> and
              open models like <strong>LLaMA 3.2</strong> to generate educational insights
              about password strength and digital hygiene — securely and responsibly.
            </p>
          </AboutSection>

          <AboutSection title="Our Mission">
            <p>
              The mission is straightforward — to help people understand cybersecurity in a
              way that feels <strong>human, accessible, and empowering</strong>. Digital
              Sentinel aims to bridge the gap between complex security concepts and everyday
              online safety.
            </p>
            <p>
              Whether you’re testing your password strength or learning about privacy
              principles, every visit should leave you a little more confident about your
              digital habits.
            </p>
          </AboutSection>

          <AboutSection title="Built by a Human, for Humans">
            <p>
              Digital Sentinel is a personal initiative by <strong>Raymond</strong> — an IT
              professional passionate about security, ethical technology, and user education.
              It’s not backed by a company or profit motive, but by the belief that open,
              trustworthy tools can make a difference in people’s digital lives.
            </p>
            <p>
              Every line of code is written with care, and every decision prioritizes user
              trust above all else.
            </p>
          </AboutSection>

          <AboutSection title="Looking Ahead">
            <p>
              As the web evolves, so will Digital Sentinel. Future plans include adding more
              educational content, real-time security insights, and even open APIs to help
              others integrate similar privacy-first principles into their own projects.
            </p>
            <p>
              This is just the beginning — and every visitor, feedback, or idea helps shape
              the path forward.
            </p>
          </AboutSection>

          <AboutSection title="Contact">
            <p>
              Have a suggestion, question, or collaboration idea? Reach out anytime at{" "}
              <a
                href="mailto:hello@digitalsentinel.com"
                className="text-blue-600 hover:underline"
              >
                hello@digitalsentinel.com
              </a>
              .
            </p>
          </AboutSection>
        </div>
      </div>
    </div>
  );
}
