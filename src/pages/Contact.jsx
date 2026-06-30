import { useState } from 'react'
import { Mail } from 'lucide-react'
import Seo from '../components/Seo'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend wired up yet -- replace with your form endpoint / email service.
    setSent(true)
  }

  return (
    <>
      <Seo title="Contact" description="Get in touch with the Anvil team -- feedback, tool requests and bug reports welcome." />
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-iron-100">Contact us</h1>
        <p className="mt-2 text-sm text-ink-900/60 dark:text-iron-100/55">
          Found a bug, or want a tool that isn't on the list yet? Send us a note.
        </p>

        {sent ? (
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-ember-500/30 bg-ember-500/10 p-5 text-sm text-ink-900 dark:text-iron-100">
            <Mail className="h-5 w-5 shrink-0 text-ember-500" />
            Thanks -- your message has been queued. We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-900/75 dark:text-iron-100/70">Name</label>
              <input required className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/15 dark:bg-char-800 dark:text-iron-100" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-900/75 dark:text-iron-100/70">Email</label>
              <input type="email" required className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/15 dark:bg-char-800 dark:text-iron-100" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-900/75 dark:text-iron-100/70">Message</label>
              <textarea required rows={5} className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/15 dark:bg-char-800 dark:text-iron-100" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-ember-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ember-600">
              Send message
            </button>
          </form>
        )}
      </div>
    </>
  )
}
