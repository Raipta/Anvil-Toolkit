import { useMemo, useState } from 'react'
import ToolPageLayout from '../../components/ToolPageLayout'

// Simple word-level LCS-based diff -- good enough for a client-side comparison tool,
// no external dependency required.
function diffWords(a, b) {
  const aw = a.split(/(\s+)/)
  const bw = b.split(/(\s+)/)
  const m = aw.length, n = bw.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = aw[i] === bw[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const result = []
  let i = 0, j = 0
  while (i < m && j < n) {
    if (aw[i] === bw[j]) { result.push({ type: 'same', text: aw[i] }); i++; j++ }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { result.push({ type: 'removed', text: aw[i] }); i++ }
    else { result.push({ type: 'added', text: bw[j] }); j++ }
  }
  while (i < m) { result.push({ type: 'removed', text: aw[i] }); i++ }
  while (j < n) { result.push({ type: 'added', text: bw[j] }); j++ }
  return result
}

export default function TextCompare({ tool }) {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')

  const diff = useMemo(() => diffWords(textA, textB), [textA, textB])
  const changedCount = diff.filter((d) => d.type !== 'same').length

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">Original text</p>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={8}
            placeholder="Paste the original text..."
            className="w-full resize-y rounded-xl border border-ink-900/10 bg-iron-50 p-3 text-sm leading-relaxed text-ink-900 outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/10 dark:bg-char-700 dark:text-iron-100"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">Text to compare</p>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={8}
            placeholder="Paste the text to compare..."
            className="w-full resize-y rounded-xl border border-ink-900/10 bg-iron-50 p-3 text-sm leading-relaxed text-ink-900 outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/10 dark:bg-char-700 dark:text-iron-100"
          />
        </div>
      </div>

      {(textA || textB) && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">Differences</p>
            <p className="text-xs text-ink-900/45 dark:text-iron-100/40">{changedCount} change{changedCount === 1 ? '' : 's'}</p>
          </div>
          <div className="rounded-xl border border-ink-900/8 bg-iron-50 p-4 text-sm leading-relaxed dark:border-iron-100/8 dark:bg-char-700">
            {diff.map((d, i) => {
              if (d.type === 'same') return <span key={i}>{d.text}</span>
              if (d.type === 'removed') return <span key={i} className="rounded bg-red-500/15 text-red-600 line-through decoration-red-500/60 dark:text-red-400">{d.text}</span>
              return <span key={i} className="rounded bg-green-500/15 text-green-700 dark:text-green-400">{d.text}</span>
            })}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-ink-900/45 dark:text-iron-100/40">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-red-500/40" /> Removed</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-green-500/40" /> Added</span>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
