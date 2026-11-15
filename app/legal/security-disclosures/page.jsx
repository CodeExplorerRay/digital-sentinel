import LegalLayout from "../LegalLayout";

export const metadata = {
  title: "Security Disclosures",
  description:
    "Report security vulnerabilities responsibly to Digital Sentinel. Our Security Disclosures page provides guidelines and a safe reporting process.",
};

const LegalSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4 text-gray-700">{children}</div>
  </section>
);
 
export default function SecurityPage() {
  return (
    <LegalLayout title="Security Disclosures" lastUpdated="October 26, 2023">

      {/* 1. Purpose */}
      <LegalSection title="1. Purpose">
        <p>
          Digital Sentinel welcomes responsible security research and vulnerability reporting. 
          This page provides guidance for reporting security issues safely and responsibly.
        </p>
      </LegalSection>

      {/* 2. Scope */}
      <LegalSection title="2. Scope">
        <p>
          The scope includes all publicly accessible Digital Sentinel tools, including the 
          password analyzer, generator, and any other online services. Do not attempt to access 
          private accounts, databases, or backend systems.
        </p>
      </LegalSection>

      {/* 3. Responsible Reporting */}
      <LegalSection title="3. Responsible Reporting">
        <p>
          If you discover a security vulnerability, please:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Report it immediately to <a href="mailto:security@digitalsentinel.io" className="text-accent hover:underline">security@digitalsentinel.io</a>.</li>
          <li>Do not publicly disclose the vulnerability before it is resolved.</li>
          <li>Do not exploit the vulnerability for personal gain or harm.</li>
        </ul>
      </LegalSection>

      {/* 4. What to Include in Reports */}
      <LegalSection title="4. What to Include in Reports">
        <p>To help us understand and fix the issue quickly, include:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>A detailed description of the vulnerability.</li>
          <li>Steps to reproduce the issue, including example inputs.</li>
          <li>Any screenshots, logs, or error messages relevant to the discovery.</li>
        </ul>
      </LegalSection>

      {/* 5. Legal Protection & Disclaimer */}
      <LegalSection title="5. Legal Protection & Disclaimer">
        <p>
          By reporting security issues responsibly, you agree to comply with this policy. 
          Digital Sentinel does not authorize any activity outside the defined scope. 
          You must not attempt to manipulate, hack, or exploit the website. 
          We are not responsible for any misuse by third parties. 
        </p>
        <p>
          Reports submitted via this page or email will be treated confidentially and used 
          solely to improve security. By participating in responsible disclosure, you are 
          protected from legal action, provided you act in good faith and follow this policy.
        </p>
      </LegalSection>

      {/* 6. Contact & Follow-up */}
      <LegalSection title="6. Contact & Follow-up">
        <p>
          Send vulnerability reports to: <a href="mailto:security@digitalsentinel.io" className="text-accent hover:underline">security@digitalsentinel.io</a>
        </p>
        <p>
          Digital Sentinel will acknowledge reports and may contact you for clarification. 
          Resolution times may vary depending on complexity.
        </p>
      </LegalSection>

      {/* Optional: thank you note */}
      <LegalSection title="7. Thank You">
        <p>
          We appreciate responsible researchers helping us improve the safety and security 
          of Digital Sentinel for everyone.
        </p>
      </LegalSection>

    </LegalLayout>
  );
}
