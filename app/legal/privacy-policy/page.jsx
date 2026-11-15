import LegalLayout, { LegalSection } from "../LegalLayout";

/**
 * Metadata for the Privacy Policy page.
 */
export const metadata = {
  title: "Privacy Policy",
  description:
    "Understand how Digital Sentinel handles your data. Our commitment to privacy means we collect as little information as possible to provide our services.",
};

/**
 * Renders the Privacy Policy page, outlining the site's data handling practices.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 26, 2023">
      <LegalSection title="Our Commitment to Your Privacy">
        <p>
          Digital Sentinel ("we," "us," or "our") is fundamentally committed to
          user privacy. Our tools are designed to provide security insights
          without compromising your data. This Privacy Policy explains our
          principles and practices.
        </p>
      </LegalSection>

      <LegalSection title="Information We Do Not Collect">
        <p>
          We operate on a principle of "privacy by design." As such, we
          explicitly <strong>do not</strong> collect, log, store, or transmit
          any personally identifiable information (PII) you enter into our
          primary tools:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Passwords entered into the Password Analyzer are processed
            exclusively within your browser. They never touch our servers.
          </li>
          <li>
            Generated passwords are created on your device and are not stored by
            us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Information We May Collect">
        <p>
          The only instance where we collect information is if you voluntarily
          subscribe to our newsletter.
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Email Address:</strong> If you subscribe to the Sentinel
            Alert Network, we collect your email address solely for the purpose
            of sending you periodic security reports and updates. Your email is
            not shared with third parties for marketing purposes.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:legal@digitalsentinel.com"
            className="text-accent hover:underline"
          >
            legal@digitalsentinel.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}