import LegalLayout, { LegalSection } from "../LegalLayout";

/**
 * Metadata for the Cookie Policy page.
 */
export const metadata = {
  title: "Cookie Policy",
  description:
    "Learn about how Digital Sentinel uses cookies. We are committed to your privacy and only use cookies that are strictly necessary for website functionality.",
};

/**
 * Renders the Cookie Policy page, explaining the use of cookies on the site.
 */
export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="October 26, 2023">
      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device (computer, tablet,
          or mobile) when you visit certain websites. They are used to
          'remember' you and your preferences, either for a single visit
          (through a "session cookie") or for multiple repeat visits (using a
          "persistent cookie").
        </p>
      </LegalSection>

      <LegalSection title="How We Use Cookies">
        <p>
          In line with our commitment to privacy, Digital Sentinel uses cookies
          sparingly. We do not use cookies for tracking, advertising, or
          collecting personal data. Our use is limited to what is strictly
          necessary for the website to function.
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary to
            provide you with services available through our website and to
            enable you to use some of its features. For example, they may be
            used to maintain the state of a tool as you interact with it.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Your Choices Regarding Cookies">
        <p>
          Most web browsers allow you to control cookies through their settings
          preferences. However, if you limit the ability of websites to set
cookies, you may worsen your overall user experience, since it will no
          longer be personalized to you. You can typically find information on
          how to manage cookies in your browser's "help" or "settings" section.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}