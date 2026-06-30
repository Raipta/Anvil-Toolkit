import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import ToolPageLayout from '../../components/ToolPageLayout'

const converters = {
  UPPERCASE: (s) => s.toUpperCase(),
  lowercase: (s) => s.toLowerCase(),
  'Title Case': (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  'Sentence case': (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (m) => m.toUpperCase()),
  'aLtErNaTiNg cAsE': (s) => s.split('').map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join(''),
}

export default function CaseConverter({ tool }) {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  const copy = (label, value) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <ToolPageLayout tool={tool}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Type or paste text to convert..."
        className="w-full resize-y rounded-xl border border-ink-900/10 bg-iron-50 p-4 text-sm leading-relaxed text-ink-900 outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/10 dark:bg-char-700 dark:text-iron-100"
      />

      <div className="mt-6 space-y-3">
        {Object.entries(converters).map(([label, fn]) => {
          const value = text ? fn(text) : ''
          return (
            <div key={label} className="rounded-xl border border-ink-900/8 bg-iron-50 p-4 dark:border-iron-100/8 dark:bg-char-700">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-ember-500">{label}</p>
                <button
                  onClick={() => copy(label, value)}
                  disabled={!value}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-ink-900/50 hover:bg-ink-900/5 disabled:opacity-30 dark:text-iron-100/45 dark:hover:bg-iron-100/10"
                >
                  {copied === label ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === label ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="break-words text-sm text-ink-900/85 dark:text-iron-100/85">{value || '\u2014'}</p>
            </div>
          )
        })}
      </div>
    </ToolPageLayout>
  )
}
