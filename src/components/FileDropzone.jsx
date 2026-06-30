import { useCallback, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function FileDropzone({ accept, multiple = false, onFiles, label = 'Drop files here, or click to browse', hint }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = useCallback((fileList) => {
    const files = Array.from(fileList)
    if (files.length) onFiles(files)
  }, [onFiles])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition ${
        dragOver
          ? 'border-ember-500 bg-ember-500/5'
          : 'border-ink-900/15 hover:border-ember-500/50 hover:bg-ember-500/5 dark:border-iron-100/15'
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
        <UploadCloud className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium text-ink-900 dark:text-iron-100">{label}</p>
      {hint && <p className="text-xs text-ink-900/45 dark:text-iron-100/40">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
