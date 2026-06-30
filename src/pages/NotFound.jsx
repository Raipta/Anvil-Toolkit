import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="text-5xl">🔨</span>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 dark:text-iron-100">404 -- Off the anvil</h1>
      <p className="mt-2 text-ink-900/55 dark:text-iron-100/50">That page doesn't exist. Maybe it's still being forged.</p>
      <Link to="/" className="mt-6 rounded-lg bg-ember-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ember-600">
        Back home
      </Link>
    </div>
  )
}
