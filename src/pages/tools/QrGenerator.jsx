import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'
import ToolPageLayout from '../../components/ToolPageLayout'

export default function QrGenerator({ tool }) {
  const [value, setValue] = useState('https://')
  const [fgColor, setFgColor] = useState('#14110F')
  const [size, setSize] = useState(256)
  const canvasWrapRef = useRef(null)

  const download = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-code.png'
    a.click()
  }

  return (
    <ToolPageLayout tool={tool}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900/75 dark:text-iron-100/70">Text or URL</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-ink-900/15 bg-iron-50 px-3 py-2.5 text-sm outline-none ring-ember-500/40 focus:ring-2 dark:border-iron-100/15 dark:bg-char-700 dark:text-iron-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900/75 dark:text-iron-100/70">Color</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-ink-900/15 dark:border-iron-100/15" />
          </div>
          <div>
            <label className="mb-1.5 flex justify-between text-sm font-medium text-ink-900/75 dark:text-iron-100/70">
              <span>Size</span><span>{size}px</span>
            </label>
            <input type="range" min="128" max="512" step="16" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-ember-500" />
          </div>
          <button onClick={download} disabled={!value} className="flex w-full items-center justify-center gap-2 rounded-xl bg-ember-500 px-4 py-3 text-sm font-semibold text-white hover:bg-ember-600 disabled:opacity-40">
            <Download className="h-4 w-4" /> Download PNG
          </button>
        </div>

        <div ref={canvasWrapRef} className="flex items-center justify-center rounded-xl bg-iron-50 p-6 dark:bg-char-700">
          {value ? (
            <QRCodeCanvas value={value} size={Math.min(size, 240)} fgColor={fgColor} bgColor="#ffffff" level="M" includeMargin />
          ) : (
            <p className="text-sm text-ink-900/40 dark:text-iron-100/35">Enter text to generate a QR code</p>
          )}
        </div>
      </div>
    </ToolPageLayout>
  )
}
