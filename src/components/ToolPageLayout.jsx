import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Seo from './Seo'
import AdSlot from './AdSlot'

export default function ToolPageLayout({ tool, children }) {
  const Icon = tool.icon
  return (
    <>
      <Seo title={tool.name} description={tool.desc} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to={`/category/${tool.category}`} className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-ink-900/55 hover:text-ember-500 dark:text-iron-100/55">
          <ChevronLeft className="h-4 w-4" /> Back to category
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-iron-100">{tool.name}</h1>
            <p className="text-sm text-ink-900/55 dark:text-iron-100/55">{tool.desc}</p>
          </div>
        </div>

        <AdSlot variant="banner" className="mb-8" />

        <div className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-sm dark:border-iron-100/8 dark:bg-char-800 sm:p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-ink-900/40 dark:text-iron-100/35">
          🔒 100% private — files are processed locally in your browser and are never uploaded anywhere.
        </p>
      </div>
    </>
  )
}
