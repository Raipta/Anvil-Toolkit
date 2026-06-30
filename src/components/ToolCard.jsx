import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ToolCard({ tool }) {
  const Icon = tool.icon
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-lg hover:shadow-ember-500/10 dark:border-iron-100/8 dark:bg-char-800"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 transition group-hover:scale-110 group-hover:bg-ember-500 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        {tool.status === 'soon' ? (
          <span className="rounded-full bg-ink-900/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-900/40 dark:bg-iron-100/10 dark:text-iron-100/40">
            Coming soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-ink-900/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-500 dark:text-iron-100/20" />
        )}
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-ink-900 dark:text-iron-100">{tool.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-900/60 dark:text-iron-100/55">{tool.desc}</p>
      </div>
    </Link>
  )
}
