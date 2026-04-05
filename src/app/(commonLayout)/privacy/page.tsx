import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, share, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20 px-4 md:px-6 mx-auto">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-10">Privacy Policy</h1>
        
        <p className="lead mb-8">Last updated: February 28, 2026</p>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">1. Introduction</h2>
          <p>
            Welcome to Medi Store (the Service), operated by mediStore (we, us, or our).
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website, use our Service, or interact with us.
          </p>
          <p className="mt-4">
            By using the Service, you agree to the collection and use of information in accordance with this policy.
            If you do not agree, please do not use the Service.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mt-8 mb-4">2.1 Personal Data</h3>
          <p>We may collect personally identifiable information, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Billing address and payment information (processed securely via third-party providers; we do not store full card details)</li>
            <li>Account credentials and profile information</li>
          </ul>

          <h3 className="text-xl font-medium mt-8 mb-4">2.2 Usage Data</h3>
          <p>We automatically collect certain information when you access or use the Service, such as:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>IP address, browser type and version</li>
            <li>Device information (type, OS, unique identifiers)</li>
            <li>Pages visited, time and date of visit, time spent on pages</li>
            <li>Referral source and exit pages</li>
            <li>Log data and performance metrics</li>
          </ul>

          <h3 className="text-xl font-medium mt-8 mb-4">2.3 Cookies and Tracking Technologies</h3>
          <p>
            We use cookies, beacons, tags, and similar technologies to collect information and improve your experience.
            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            For details, see our Cookie Policy (linked separately if applicable).
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">3. How We Use Your Information</h2>
          <p>We use collected data for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>To provide, maintain, and improve the Service</li>
            <li>To process payments and manage subscriptions</li>
            <li>To notify you about changes, updates, or support issues</li>
            <li>To send marketing communications (only with your consent where required)</li>
            <li>To detect, prevent, and address technical issues or abuse</li>
            <li>For analytics, research, and product development</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">4. Sharing of Your Information</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Service providers (payment processors, hosting, analytics, email services)</li>
            <li>Business partners (only with your consent or as necessary for the Service)</li>
            <li>Legal authorities when required by law, subpoena, or to protect rights/safety</li>
            <li>In connection with a merger, acquisition, or asset sale</li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">5. Data Security</h2>
          <p>
            We implement reasonable technical, administrative, and physical security measures to protect your data.
            However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">6. Your Data Protection Rights</h2>
          <p>Depending on your location (GDPR, CCPA/CPRA, etc.), you may have rights to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access, update, or delete your personal data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at [your-email@example.com].
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">7. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy,
            or as required by law. Usage data is typically retained for analytics purposes for up to 24 months.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">8. International Data Transfers</h2>
          <p>
            Your information may be transferred to — and maintained on — computers located outside of your state,
            province, country or other governmental jurisdiction where data protection laws may differ.
            We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">9. Changes to This Privacy Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of material changes by email or prominent notice on the Service.
            Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:<br />
            Email: medi-store@yaho.com<br />
            medistore@gmail.com<br />
            Dhaka Bangladesh<br />
            Dhaka, Bangladesh 
          </p>
        </section>
      </div>
    </div>
  );
}