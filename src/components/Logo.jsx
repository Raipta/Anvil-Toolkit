import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-char-950 dark:bg-ember-500">
        <svg viewBox="0 0 64 64" className="h-4.5 w-4.5">
          <path d="M14 26h36l-4 8H30l-2 6h-6l2-6H14z" fill="#F2622E" />
          <rect x="27" y="40" width="10" height="12" rx="2" fill="#F2622E" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-spark rounded-full bg-spark-400" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-iron-100">
        Anvil
      </span>
    </Link>
  )
}
