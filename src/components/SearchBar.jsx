import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { tools } from '../data/tools'

export default function SearchBar({ size = 'lg', placeholder = 'Search 17 tools… e.g. "merge pdf"' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const wrapRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return tools.filter((t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  useEffect(() => {
    function onClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const goTo = (slug) => {
    navigate(`/tools/${slug}`)
    setQuery('')
    setOpen(false)
  }

  const pad = size === 'lg' ? 'py-4 pl-12 pr-4 text-base' : 'py-2.5 pl-10 pr-3 text-sm'

  return (
    <div ref={wrapRef} className="relative w-full">
      <Search className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-900/40 dark:text-iron-100/40 ${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-ink-900/10 bg-white/90 ${pad} font-medium text-ink-900 shadow-sm outline-none ring-ember-500/40 transition placeholder:text-ink-900/40 focus:ring-2 dark:border-iron-100/10 dark:bg-char-800/90 dark:text-iron-100 dark:placeholder:text-iron-100/40`}
      />
      {open && results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-xl dark:border-iron-100/10 dark:bg-char-800">
          {results.map((t) => (
            <button
              key={t.slug}
              onClick={() => goTo(t.slug)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-ember-500/10"
            >
              <t.icon className="h-4 w-4 shrink-0 text-ember-500" />
              <span className="font-medium text-ink-900 dark:text-iron-100">{t.name}</span>
              {t.status === 'soon' && (
                <span className="ml-auto rounded-full bg-ink-900/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-900/40 dark:bg-iron-100/10 dark:text-iron-100/40">soon</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
