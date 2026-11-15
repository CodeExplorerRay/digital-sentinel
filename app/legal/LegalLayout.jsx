import React from "react";

/**
 * A reusable section component for legal pages, providing a consistent heading style.
 * @param {{ title: string; children: React.ReactNode }} props
 */
export const LegalSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4 text-gray-700">{children}</div>
  </section>
);

/**
 * Provides a consistent layout for all legal pages (e.g., Privacy Policy, Terms of Use).
 * It includes a standardized header with a title and last updated date.
 *
 * @param {{
 *   title: string;
 *   lastUpdated: string;
 *   children: React.ReactNode;
 * }} props
 */
export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="bg-white text-gray-800 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Last Updated: {lastUpdated}
          </p>
        </header>
        <article className="prose prose-lg max-w-none">{children}</article>
      </div>
    </div>
  );
}