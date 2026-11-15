import LegalLayout, { LegalSection } from "../LegalLayout";

/**
 * Metadata for the Terms of Use page.
 */
export const metadata = {
  title: "Terms of Use",
  description:
    "Read the Terms of Use for Digital Sentinel. By using our services, you agree to these terms, which govern your access to and use of our free security tools.",
};

/**
 * Renders the Terms of Use page, detailing the rules and guidelines for using the service.
 */
export default function TermsOfUsePage() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated="October 26, 2025">
      
      {/* 1. Acceptance of Terms */}
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using Digital Sentinel and its tools (the "Service"), 
          you agree to be bound by these Terms of Use ("Terms"). If you do not 
          agree to these Terms, do not use the Service.
        </p>
      </LegalSection>

      {/* 2. Description of Service */}
      <LegalSection title="2. Description of Service">
        <p>
          Digital Sentinel provides free, client-side cybersecurity tools, 
          including a password analyzer and password generator. The Service 
          is provided "as is" and for educational purposes only.
        </p>
      </LegalSection>

      {/* 3. User Responsibility */}
      <LegalSection title="3. User Responsibility">
        <p>
          Users are solely responsible for any passwords entered or actions 
          taken using the Service. Digital Sentinel does not store, log, or 
          access your passwords. You must not attempt to misuse or attack 
          the Service.
        </p>
      </LegalSection>

      {/* 4. Security Disclosures */}
      <LegalSection title="4. Security Disclosures">
        <p>
          If you identify a vulnerability or security issue, please report it 
          responsibly via our <a href="/legal/security" className="text-accent hover:underline">
          Security Disclosures</a> page.
          Do not exploit vulnerabilities on the live site.
        </p>
      </LegalSection>

      {/* 5. Disclaimer of Warranties */}
      <LegalSection title="5. Disclaimer of Warranties">
        <p>
          The Service is provided "as is" and "as available". Digital Sentinel 
          disclaims all warranties, whether express or implied, including 
          merchantability, fitness for a particular purpose, or non-infringement. 
          The Service may be interrupted or contain errors.
        </p>
      </LegalSection>

      {/* 6. Limitation of Liability */}
      <LegalSection title="6. Limitation of Liability">
        <p>
          In no event shall Digital Sentinel, its creators, or affiliates be liable 
          for any direct, indirect, incidental, special, or consequential damages 
          resulting from the use or inability to use the Service. This includes, 
          but is not limited to, any misuse of passwords, security breaches, or 
          reliance on generated advice.
        </p>
      </LegalSection>

      {/* 7. Governing Law */}
      <LegalSection title="7. Governing Law">
        <p>
          These Terms are governed by the laws of the jurisdiction where the 
          website owner is based, without regard to conflicts of law principles.
        </p>
      </LegalSection>

      {/* 8. Changes to Terms */}
      <LegalSection title="8. Changes to Terms">
        <p>
          Digital Sentinel reserves the right to update these Terms at any time. 
          Continued use of the Service constitutes acceptance of any changes.
        </p>
      </LegalSection>

      {/* 9. Contact */}
      <LegalSection title="9. Contact">
        <p>
          For questions regarding these Terms or security reporting, you may 
          contact us at <a href="mailto:security@digitalsentinel.io" className="text-accent hover:underline">
          security@digitalsentinel.io</a>.
        </p>
      </LegalSection>

    </LegalLayout>
  );
}
