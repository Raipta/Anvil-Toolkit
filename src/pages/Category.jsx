import { useParams, Navigate } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import AdSlot from '../components/AdSlot'
import Seo from '../components/Seo'
import { categories, toolsByCategory } from '../data/tools'

export default function Category() {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  if (!category) return <Navigate to="/" replace />

  const tools = toolsByCategory(categoryId)

  return (
    <>
      <Seo title={category.name} description={`Browse all ${category.name.toLowerCase()} — free, fast and 100% private, processed right in your browser.`} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-iron-100">{category.name}</h1>
        <p className="mt-2 text-ink-900/55 dark:text-iron-100/50">{tools.length} tools, all free and processed locally in your browser.</p>

        <div className="my-8">
          <AdSlot variant="banner" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </div>
    </>
  )
}
