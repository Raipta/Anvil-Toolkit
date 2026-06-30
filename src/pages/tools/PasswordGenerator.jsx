import { useEffect, useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import ToolPageLayout from '../../components/ToolPageLayout'

const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function generate(length, opts) {
  let pool = ''
  Object.keys(opts).forEach((k) => { if (opts[k]) pool += SETS[k] })
  if (!pool) return ''
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (n) => pool[n % pool.length]).join('')
}

function strength(pwd) {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 14) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

export default function PasswordGenerator({ tool }) {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const regenerate = () => setPassword(generate(length, opts))

  useEffect(() => { regenerate() }, [length, opts])

  const copy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const score = strength(password)
  const labels = ['Very weak', 'Weak', 'Okay', 'Strong', 'Very strong', 'Excellent']
  const colors = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-amber-400', 'bg-green-500', 'bg-green-500']

  const toggle = (key) => setOpts((o) => ({ ...o, [key]: !o[key] }))

  return (
    <ToolPageLayout tool={tool}>
      <div className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-iron-50 p-4 dark:border-iron-100/10 dark:bg-char-700">
        <p className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-lg font-semibold text-ink-900 dark:text-iron-100">{password || 'Select at least one option'}</p>
        <button onClick={regenerate} className="rounded-lg p-2 text-ink-900/55 hover:bg-ink-900/5 dark:text-iron-100/50 dark:hover:bg-iron-100/10">
          <RefreshCw className="h-4 w-4" />
        </button>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-lg bg-ember-500 px-3 py-2 text-sm font-semibold text-white hover:bg-ember-600">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8 dark:bg-iron-100/10">
        <div className={`h-full transition-all ${colors[score]}`} style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <p className="mt-1 text-xs text-ink-900/45 dark:text-iron-100/40">{password ? labels[score] : '—'}</p>

      <div className="mt-7">
        <label className="mb-1.5 flex justify-between text-sm font-medium text-ink-900/75 dark:text-iron-100/70">
          <span>Length</span><span>{length} characters</span>
        </label>
        <input type="range" min="6" max="48" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-ember-500" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.keys(SETS).map((key) => (
          <label key={key} className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink-900/10 px-3 py-2.5 text-sm capitalize text-ink-900/75 dark:border-iron-100/10 dark:text-iron-100/70">
            <input type="checkbox" checked={opts[key]} onChange={() => toggle(key)} className="h-4 w-4 accent-ember-500" />
            {key}
          </label>
        ))}
      </div>
    </ToolPageLayout>
  )
}
