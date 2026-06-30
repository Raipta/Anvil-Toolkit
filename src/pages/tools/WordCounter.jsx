import { useMemo, useState } from 'react'
import ToolPageLayout from '../../components/ToolPageLayout'

export default function WordCounter({ tool }) {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) || []).length || (text.trim() ? 1 : 0) : 0
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0
    const readingMinutes = Math.max(1, Math.ceil(words / 200))
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingMinutes }
  }, [text])

  const cards = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading time', value: `${stats.readingMinutes} min` },
  ]

  return (
    <ToolPageLayout tool={tool}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Start typing or paste your text here..."
        className="w-full resize-y rounded-xl border border-ink-900/10 bg-iron-50 p-4 text-sm leading-relaxed text-ink-900 outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/10 dark:bg-char-700 dark:text-iron-100"
      />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-ink-900/8 bg-iron-50 p-3 text-center dark:border-iron-100/8 dark:bg-char-700">
            <p className="font-display text-xl font-bold text-ember-500">{c.value}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-ink-900/50 dark:text-iron-100/45">{c.label}</p>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  )
}
