import React from 'react';

/**
 * PrivacyPolicy.jsx
 * React component for the Assalam Telecom Privacy Policy page.
 * - Tailwind CSS is used for styling (you can adapt to your project's CSS).
 *
 * Usage:
 * <PrivacyPolicy />
 */

export default function PrivacyPolicy() {
  const effectiveDate = 'September 3, 2025';
  const supportEmail = 'info@assalamtelecom.com.ng';

  return (
    <div className="min-h-screen bg-gray-50 flex items-start py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-md p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Privacy Policy for Assalam Telecom</h1>
          <p className="text-sm text-slate-500 mt-1">Effective date: <strong>{effectiveDate}</strong> — Last updated: <strong>{effectiveDate}</strong></p>
        </header>

        <section className="prose prose-slate">
          <p>
            Assalam Telecom ("we", "us", or "our") operates the Assalam Telecom mobile
            application (the "App"). This Privacy Policy explains how we collect, use,
            disclose, and protect information collected through the App.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Personal information</strong> — name, phone number, email address, billing or payment
              details when you register or make purchases.
            </li>
            <li>
              <strong>Device information</strong> — device model, operating system, unique device identifiers
              (for example: advertising ID), IP address, and mobile network information.
            </li>
            <li>
              <strong>Usage information</strong> — features used, pages/screens viewed, session duration, and other analytics data.
            </li>
            <li>
              <strong>Location information</strong> — approximate or precise location only if you grant location permission in the app.
            </li>
            <li>
              <strong>Third‑party service data</strong> — analytics, crash reporting, push notification tokens, and advertising identifiers collected by third‑party SDKs we use (for example: Firebase, AdMob, OneSignal).
            </li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and operate the App’s features and customer support.</li>
            <li>Process transactions and manage billing.</li>
            <li>Personalize and improve the App experience and to perform analytics.</li>
            <li>Send important communications, transactional messages, and marketing (where you consent).</li>
            <li>Detect and prevent fraud, abuse, and security incidents.</li>
          </ul>

          <h2>3. Legal Bases (where applicable)</h2>
          <p>
            If you are located in a jurisdiction that requires us to state a legal basis for processing
            (for example, the European Economic Area), we rely on:
          </p>
          <ul>
            <li>Processing necessary for performance of a contract (e.g., to provide the App).</li>
            <li>Processing based on your consent (e.g., marketing messages, optional analytics).</li>
            <li>Our legitimate interests (e.g., improving the App, security) where not overridden by your rights.</li>
          </ul>

          <h2>4. Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service providers</strong> (payment processors, analytics providers, hosting providers, push notification services).</li>
            <li><strong>Legal and safety</strong> — when required by law or to protect rights and safety.</li>
            <li><strong>Business transfers</strong> — in connection with a merger, sale, or asset transfer.</li>
          </ul>

          <h2>5. Third‑Party SDKs &amp; Advertising</h2>
          <p>
            The App may include third‑party SDKs that collect identifiers and usage data (for example: advertising ID, crash reports, analytics).
            These SDKs are governed by their own privacy policies. Examples of third‑party services we may use include:
          </p>
          <ul>
            <li>Firebase (Google) — analytics, crash reporting, authentication</li>
            <li>AdMob / Google Mobile Ads — advertising and ad identifiers</li>
            <li>OneSignal or other push providers — push notification tokens</li>
          </ul>

          <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-100">
            <strong className="block">Note:</strong>
            <span className="block text-sm text-slate-700 mt-1">Please ensure the Data Safety form in Google Play Console accurately reflects these SDKs and the types of data collected.</span>
          </div>

          <h2>6. Data Retention</h2>
          <p>
            We keep personal data only as long as needed to provide the service, comply with legal obligations,
            resolve disputes, and enforce our agreements. Data that is no longer required will be deleted or anonymized.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical safeguards to protect personal data. However,
            no system is completely secure; absolute security cannot be guaranteed.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, update, export, or delete your personal data,
            and to object to or restrict processing. To exercise these rights, contact us at the details below.
          </p>

          <h2>9. Children</h2>
          <p>The App is not intended for children under 13. We do not knowingly collect personal information from children.</p>

          <h2>10. International Transfers</h2>
          <p>Data may be processed and stored in countries other than your own. We will take steps required by applicable law to ensure adequate protection for international transfers.</p>

          <h2>11. Updates to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will post the updated policy on this page with a revised "Last updated" date.</p>

          <h2>12. Contact Us</h2>
          <p>If you have questions or requests regarding this Privacy Policy, contact us:</p>

          <pre className="bg-gray-50 p-4 rounded text-sm">Assalam Telecom
Email: {supportEmail}
Website: https://assalamtelecom.com.ng</pre>
        </section>

        <footer className="mt-8 text-sm text-slate-400">© Assalam Telecom. All rights reserved.</footer>
      </main>
    </div>
  );
}
