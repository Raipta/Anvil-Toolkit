import Seo from '../components/Seo'

export default function About() {
  return (
    <>
      <Seo title="About" description="Learn about Anvil, a free toolkit of browser-based PDF, image, text and generator utilities." />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-iron-100">About Anvil</h1>
        <div className="prose-sm mt-6 space-y-4 text-ink-900/70 dark:text-iron-100/65">
          <p>
            Anvil started from a simple frustration: most "free" online tools force you to upload personal files to a stranger's server,
            sit through ads disguised as download buttons, or hand over an email address just to convert a file. We wanted something faster and more honest.
          </p>
          <p>
            Every tool on Anvil runs entirely inside your browser using JavaScript. When you merge a PDF or compress an image, the file never
            leaves your device — there's no upload, no server-side processing, and nothing to wait for in a queue.
          </p>
          <p>
            We're a small team that believes useful software doesn't need to be complicated. If there's a tool you'd like to see added,
            reach out on the <a href="/contact" className="text-ember-500 hover:underline">contact page</a> — we read every message.
          </p>
        </div>
      </div>
    </>
  )
}
