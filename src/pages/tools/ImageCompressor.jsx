import { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { Download, Loader2, RotateCcw } from 'lucide-react'
import ToolPageLayout from '../../components/ToolPageLayout'
import FileDropzone from '../../components/FileDropzone'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function ImageCompressor({ tool }) {
  const [original, setOriginal] = useState(null)
  const [result, setResult] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const onFiles = (files) => {
    const file = files[0]
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setError('')
    setResult(null)
    setOriginal({ file, url: URL.createObjectURL(file) })
  }

  const compress = async () => {
    if (!original) return
    setProcessing(true)
    setError('')
    try {
      const compressed = await imageCompression(original.file, {
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        initialQuality: quality,
        useWebWorker: true,
      })
      setResult({ file: compressed, url: URL.createObjectURL(compressed) })
    } catch (e) {
      console.error(e)
      setError('Could not compress that image. Try a different file.')
    } finally {
      setProcessing(false)
    }
  }

  const reset = () => { setOriginal(null); setResult(null); setError('') }

  const savings = result ? Math.max(0, Math.round((1 - result.file.size / original.file.size) * 100)) : 0

  return (
    <ToolPageLayout tool={tool}>
      {!original ? (
        <FileDropzone accept="image/*" onFiles={onFiles} label="Drop an image here, or click to browse" hint="JPG, PNG or WebP" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">Original — {formatSize(original.file.size)}</p>
              <img src={original.url} alt="original" className="aspect-video w-full rounded-xl object-cover" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-900/40 dark:text-iron-100/40">
                {result ? `Compressed — ${formatSize(result.file.size)} (${savings}% smaller)` : 'Compressed preview'}
              </p>
              <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-iron-100 dark:bg-char-700">
                {result ? <img src={result.url} alt="compressed" className="h-full w-full rounded-xl object-cover" /> : <p className="text-xs text-ink-900/35 dark:text-iron-100/30">Run compression to preview</p>}
              </div>
            </div>
          </div>

          {!result && (
            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-ink-900/75 dark:text-iron-100/70">
                <span>Quality</span><span>{Math.round(quality * 100)}%</span>
              </label>
              <input type="range" min="0.1" max="0.95" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-ember-500" />
              <p className="mt-1 text-xs text-ink-900/40 dark:text-iron-100/35">Lower quality = smaller file size.</p>
            </div>
          )}

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <div className="flex gap-3">
            {!result ? (
              <button onClick={compress} disabled={processing} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ember-500 px-4 py-3 text-sm font-semibold text-white hover:bg-ember-600 disabled:opacity-50">
                {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Compressing...</> : 'Compress image'}
              </button>
            ) : (
              <a href={result.url} download={`compressed-${original.file.name}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ember-500 px-4 py-3 text-sm font-semibold text-white hover:bg-ember-600">
                <Download className="h-4 w-4" /> Download
              </a>
            )}
            <button onClick={reset} className="flex items-center justify-center gap-2 rounded-xl border border-ink-900/15 px-4 py-3 text-sm font-semibold text-ink-900/70 hover:bg-ink-900/5 dark:border-iron-100/15 dark:text-iron-100/70">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
