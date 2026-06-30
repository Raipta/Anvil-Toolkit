import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { GripVertical, X, FileText, Download, Loader2 } from 'lucide-react'
import ToolPageLayout from '../../components/ToolPageLayout'
import FileDropzone from '../../components/FileDropzone'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function MergePdf({ tool }) {
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [resultSize, setResultSize] = useState(0)
  const [error, setError] = useState('')
  const [dragIndex, setDragIndex] = useState(null)

  const addFiles = (newFiles) => {
    setError('')
    setResultUrl(null)
    const pdfs = newFiles.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
    if (!pdfs.length) {
      setError('Please choose PDF files only.')
      return
    }
    setFiles((prev) => [...prev, ...pdfs.map((file) => ({ id: `${file.name}-${file.size}-${Math.random()}`, file }))])
  }

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id))

  const reorder = (from, to) => {
    setFiles((prev) => {
      const copy = [...prev]
      const [moved] = copy.splice(from, 1)
      copy.splice(to, 0, moved)
      return copy
    })
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Add at least 2 PDF files to merge.')
      return
    }
    setError('')
    setProcessing(true)
    setResultUrl(null)
    try {
      const mergedPdf = await PDFDocument.create()
      for (const { file } of files) {
        const bytes = await file.arrayBuffer()
        const srcPdf = await PDFDocument.load(bytes, { ignoreEncryption: true })
        const pages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices())
        pages.forEach((p) => mergedPdf.addPage(p))
      }
      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([mergedBytes], { type: 'application/pdf' })
      setResultSize(blob.size)
      setResultUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
      setError('Something went wrong reading one of those PDFs. Make sure they are not password protected.')
    } finally {
      setProcessing(false)
    }
  }

  const reset = () => {
    setFiles([])
    setResultUrl(null)
    setError('')
  }

  return (
    <ToolPageLayout tool={tool}>
      {!resultUrl ? (
        <div className="space-y-5">
          <FileDropzone
            accept="application/pdf"
            multiple
            onFiles={addFiles}
            label="Drop PDF files here, or click to browse"
            hint="You can add multiple files. Reorder them below before merging."
          />

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li
                  key={f.id}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i); setDragIndex(null) }}
                  className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-iron-50 px-3 py-2.5 dark:border-iron-100/10 dark:bg-char-700"
                >
                  <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-ink-900/30 dark:text-iron-100/30" />
                  <FileText className="h-4 w-4 shrink-0 text-ember-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-iron-100">{f.file.name}</p>
                    <p className="text-xs text-ink-900/45 dark:text-iron-100/40">{formatSize(f.file.size)}</p>
                  </div>
                  <span className="rounded-full bg-ink-900/5 px-2 py-0.5 text-[10px] font-medium text-ink-900/40 dark:bg-iron-100/10 dark:text-iron-100/40">#{i + 1}</span>
                  <button onClick={() => removeFile(f.id)} className="rounded-md p-1 text-ink-900/40 hover:bg-red-500/10 hover:text-red-500 dark:text-iron-100/40">
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={mergePdfs}
            disabled={processing || files.length < 2}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ember-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {processing ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Merging {files.length} files...</>
            ) : (
              `Merge ${files.length || ''} PDFs`
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-iron-100">Your merged PDF is ready</h2>
            <p className="mt-1 text-sm text-ink-900/55 dark:text-iron-100/50">{files.length} files combined - {formatSize(resultSize)}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={resultUrl}
              download="merged.pdf"
              className="flex items-center gap-2 rounded-xl bg-ember-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ember-600"
            >
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <button onClick={reset} className="rounded-xl border border-ink-900/15 px-5 py-2.5 text-sm font-semibold text-ink-900/70 hover:bg-ink-900/5 dark:border-iron-100/15 dark:text-iron-100/70">
              Merge more
            </button>
          </div>
        </div>
      )}
    </ToolPageLayout>
  )
}
