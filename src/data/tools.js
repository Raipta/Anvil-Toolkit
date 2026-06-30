import {
  FileStack, Scissors, FileArchive, FileImage, Stamp,
  ImageDown, Crop, RefreshCw, Eraser,
  TextCursorInput, CaseSensitive, GitCompareArrows, Sparkles,
  QrCode, FileUser, ReceiptText, KeyRound,
} from 'lucide-react'

export const categories = [
  { id: 'pdf', name: 'PDF Tools', color: 'ember' },
  { id: 'image', name: 'Image Tools', color: 'ember' },
  { id: 'text', name: 'Text Tools', color: 'ember' },
  { id: 'generators', name: 'Generators', color: 'ember' },
]

export const tools = [
  // PDF
  { slug: 'merge-pdf', name: 'Merge PDF', category: 'pdf', icon: FileStack, desc: 'Combine multiple PDFs into one document, reorder pages, done in your browser.', status: 'live' },
  { slug: 'split-pdf', name: 'Split PDF', category: 'pdf', icon: Scissors, desc: 'Pull out a page range or split every page into its own file.', status: 'soon' },
  { slug: 'compress-pdf', name: 'Compress PDF', category: 'pdf', icon: FileArchive, desc: 'Shrink PDF file size while keeping pages sharp and readable.', status: 'soon' },
  { slug: 'pdf-to-image', name: 'PDF to Image', category: 'pdf', icon: FileImage, desc: 'Export every page of a PDF as a crisp PNG or JPG image.', status: 'soon' },
  { slug: 'watermark-pdf', name: 'Add Watermark', category: 'pdf', icon: Stamp, desc: 'Stamp a custom text watermark across every page of a PDF.', status: 'soon' },

  // Image
  { slug: 'image-compressor', name: 'Image Compressor', category: 'image', icon: ImageDown, desc: 'Reduce image file size with a live before / after comparison.', status: 'live' },
  { slug: 'image-resizer', name: 'Image Resizer', category: 'image', icon: Crop, desc: 'Resize any image to exact custom dimensions, instantly.', status: 'soon' },
  { slug: 'format-converter', name: 'Format Converter', category: 'image', icon: RefreshCw, desc: 'Convert between PNG, JPG and WebP without leaving the page.', status: 'soon' },
  { slug: 'background-remover', name: 'Background Remover', category: 'image', icon: Eraser, desc: 'Cut the background out of a photo automatically.', status: 'soon' },

  // Text
  { slug: 'word-counter', name: 'Word & Character Counter', category: 'text', icon: TextCursorInput, desc: 'Live word, character, sentence and reading-time counts as you type.', status: 'live' },
  { slug: 'case-converter', name: 'Case Converter', category: 'text', icon: CaseSensitive, desc: 'Switch text between UPPER, lower, Title and Sentence case.', status: 'live' },
  { slug: 'text-compare', name: 'Text Compare', category: 'text', icon: GitCompareArrows, desc: 'Compare two blocks of text and highlight every difference.', status: 'live' },
  { slug: 'paraphraser', name: 'Text Paraphraser', category: 'text', icon: Sparkles, desc: 'Rewrite a sentence with simple synonym-based paraphrasing.', status: 'soon' },

  // Generators
  { slug: 'qr-generator', name: 'QR Code Generator', category: 'generators', icon: QrCode, desc: 'Turn any text or URL into a downloadable QR code.', status: 'live' },
  { slug: 'resume-builder', name: 'Resume Builder', category: 'generators', icon: FileUser, desc: 'Build a clean resume with a live preview, export as PDF.', status: 'soon' },
  { slug: 'invoice-generator', name: 'Invoice Generator', category: 'generators', icon: ReceiptText, desc: 'Itemised invoices with auto-calculated totals, export as PDF.', status: 'soon' },
  { slug: 'password-generator', name: 'Password Generator', category: 'generators', icon: KeyRound, desc: 'Generate strong, customisable passwords on demand.', status: 'live' },
]

export const getToolBySlug = (slug) => tools.find((t) => t.slug === slug)
export const toolsByCategory = (catId) => tools.filter((t) => t.category === catId)
