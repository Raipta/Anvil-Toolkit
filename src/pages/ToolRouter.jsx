import { useParams, Navigate } from 'react-router-dom'
import { getToolBySlug } from '../data/tools'
import ToolPageLayout from '../components/ToolPageLayout'
import { Hammer } from 'lucide-react'

import MergePdf from './tools/MergePdf'
import ImageCompressor from './tools/ImageCompressor'
import WordCounter from './tools/WordCounter'
import CaseConverter from './tools/CaseConverter'
import TextCompare from './tools/TextCompare'
import QrGenerator from './tools/QrGenerator'
import PasswordGenerator from './tools/PasswordGenerator'

const liveComponents = {
  'merge-pdf': MergePdf,
  'image-compressor': ImageCompressor,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'text-compare': TextCompare,
  'qr-generator': QrGenerator,
  'password-generator': PasswordGenerator,
}

function ComingSoon({ tool }) {
  return (
    <ToolPageLayout tool={tool}>
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
          <Hammer className="h-6 w-6" />
        </div>
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-iron-100">Still on the anvil</h2>
        <p className="max-w-sm text-sm text-ink-900/55 dark:text-iron-100/50">
          This tool is being built right now. Check back soon, or explore the other live tools in the meantime.
        </p>
      </div>
    </ToolPageLayout>
  )
}

export default function ToolRouter() {
  const { slug } = useParams()
  const tool = getToolBySlug(slug)
  if (!tool) return <Navigate to="/" replace />

  const Live = liveComponents[slug]
  if (Live) return <Live tool={tool} />
  return <ComingSoon tool={tool} />
}
