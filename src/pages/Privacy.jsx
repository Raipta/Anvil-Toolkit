import Seo from '../components/Seo'

const sections = [
  {
    title: '1. Files are processed locally',
    body: `Every tool on Anvil (PDF tools, image tools, text tools, and generators) runs entirely in your web browser using client-side JavaScript. When you upload a file to a tool, that file is read directly from your device's memory -- it is never transmitted to, stored on, or processed by our servers. Closing the tab or refreshing the page permanently discards the file.`,
  },
  {
    title: '2. What we do collect',
    body: `We use privacy-respecting analytics to understand which tools are popular (page views, country-level location, device type). We do not log file names, file contents, or any data you enter into a tool. If you contact us via the contact form, we store your name, email and message only to respond to you.`,
  },
  {
    title: '3. Cookies and advertising',
    body: `Anvil may display advertising through third-party networks (such as Google AdSense) to keep every tool free. These networks may use cookies or similar technologies to serve relevant ads. You can opt out of personalised advertising through your browser settings or via the Google Ads Settings page.`,
  },
  {
    title: '4. Local storage',
    body: `Some tools save your preferences (such as theme choice) using your browser's local storage. This data stays on your device and is never sent to us.`,
  },
  {
    title: '5. Changes to this policy',
    body: `We may update this privacy policy from time to time. Material changes will be reflected with a new "last updated" date on this page.`,
  },
  {
    title: '6. Contact us',
    body: `If you have questions about this policy or how a specific tool works, reach out via our contact page.`,
  },
]

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description="Anvil privacy policy: all files are processed locally in your browser and are never uploaded to or stored on our servers." />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-iron-100">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-900/45 dark:text-iron-100/40">Last updated: June 2026</p>

        <div className="mt-8 rounded-xl border border-ember-500/25 bg-ember-500/5 p-4 text-sm text-ink-900/75 dark:text-iron-100/75">
          <strong>In short:</strong> your files never leave your device. Every Anvil tool processes data locally in your browser -- nothing is uploaded to a server.
        </div>

        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-iron-100">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/65 dark:text-iron-100/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
