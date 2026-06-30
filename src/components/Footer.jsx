import { Link } from 'react-router-dom'
import Logo from './Logo'
import { categories, toolsByCategory } from '../data/tools'

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/8 bg-white dark:border-iron-100/8 dark:bg-char-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-900/60 dark:text-iron-100/55">
              Free tools that run entirely in your browser. Your files are processed on your device and never uploaded to a server.
            </p>
          </div>

          {categories.map((c) => (
            <div key={c.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">{c.name}</p>
              <ul className="mt-3 space-y-2">
                {toolsByCategory(c.id).slice(0, 5).map((t) => (
                  <li key={t.slug}>
                    <Link to={`/tools/${t.slug}`} className="text-sm text-ink-900/65 hover:text-ember-500 dark:text-iron-100/60">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-900/8 pt-6 text-sm text-ink-900/55 dark:border-iron-100/8 dark:text-iron-100/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Anvil. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-ember-500">About</Link>
            <Link to="/privacy" className="hover:text-ember-500">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-ember-500">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
