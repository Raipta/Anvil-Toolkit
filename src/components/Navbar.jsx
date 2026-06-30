import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import { useTheme } from '../lib/ThemeContext'
import { categories, toolsByCategory } from '../data/tools'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-iron-50/85 backdrop-blur-md dark:border-iron-100/8 dark:bg-char-950/85">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Category dropdown - desktop */}
        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setCatOpen(true)}
          onMouseLeave={() => setCatOpen(false)}
        >
          <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-900/70 transition hover:bg-ink-900/5 hover:text-ink-900 dark:text-iron-100/70 dark:hover:bg-iron-100/10 dark:hover:text-iron-100">
            Categories <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {catOpen && (
            <div className="absolute left-0 top-full grid w-[560px] grid-cols-2 gap-1 rounded-2xl border border-ink-900/10 bg-white p-3 shadow-xl dark:border-iron-100/10 dark:bg-char-800">
              {categories.map((c) => (
                <div key={c.id} className="p-2">
                  <Link to={`/category/${c.id}`} className="text-xs font-semibold uppercase tracking-wide text-ember-500 hover:underline">
                    {c.name}
                  </Link>
                  <ul className="mt-2 space-y-1">
                    {toolsByCategory(c.id).slice(0, 4).map((t) => (
                      <li key={t.slug}>
                        <Link to={`/tools/${t.slug}`} className="block rounded-md px-1.5 py-1 text-sm text-ink-900/70 hover:bg-ember-500/10 hover:text-ink-900 dark:text-iron-100/70 dark:hover:text-iron-100">
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden flex-1 md:block md:max-w-sm">
          <SearchBar size="sm" placeholder="Search tools…" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-ink-900/70 hover:bg-ink-900/5 dark:text-iron-100/70 dark:hover:bg-iron-100/10">About</NavLink>
          <NavLink to="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-ink-900/70 hover:bg-ink-900/5 dark:text-iron-100/70 dark:hover:bg-iron-100/10">Contact</NavLink>
        </nav>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900/70 transition hover:bg-ink-900/5 dark:border-iron-100/10 dark:text-iron-100/70 dark:hover:bg-iron-100/10"
        >
          {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900/70 dark:border-iron-100/10 dark:text-iron-100/70 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-900/8 px-4 pb-5 pt-3 dark:border-iron-100/8 lg:hidden">
          <div className="mb-4 md:hidden">
            <SearchBar size="sm" placeholder="Search tools…" />
          </div>
          {categories.map((c) => (
            <div key={c.id} className="mb-3">
              <p className="px-1 text-xs font-semibold uppercase tracking-wide text-ember-500">{c.name}</p>
              <ul className="mt-1">
                {toolsByCategory(c.id).map((t) => (
                  <li key={t.slug}>
                    <Link onClick={() => setMobileOpen(false)} to={`/tools/${t.slug}`} className="block rounded-md px-2 py-1.5 text-sm text-ink-900/75 hover:bg-ember-500/10 dark:text-iron-100/75">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-3 flex gap-4 border-t border-ink-900/8 pt-3 text-sm dark:border-iron-100/8">
            <Link onClick={() => setMobileOpen(false)} to="/about" className="text-ink-900/70 dark:text-iron-100/70">About</Link>
            <Link onClick={() => setMobileOpen(false)} to="/contact" className="text-ink-900/70 dark:text-iron-100/70">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
