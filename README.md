# Anvil — Free Online Tools That Run In Your Browser

A modern, multi-tool utility website built with **React + Tailwind CSS v4 + Vite**.
Every tool processes files locally in the browser — nothing is ever uploaded to a server.

## Features

- Hero search bar that filters all 17 tools live
- Category pages (PDF, Image, Text, Generators) with card grids
- Dark / light mode toggle (persisted to `localStorage`)
- Mobile-responsive nav with category mega-menu
- Reserved ad slots (header banner / sidebar / in-content) — no layout shift
- Per-page SEO titles & meta descriptions
- Privacy Policy, About and Contact pages

## Tools implemented

| Tool | Status | Library |
|---|---|---|
| Merge PDF | Live | `pdf-lib` |
| Image Compressor | Live | `browser-image-compression` |
| Word & Character Counter | Live | — |
| Case Converter | Live | — |
| Text Compare (diff highlighter) | Live | — |
| QR Code Generator | Live | `qrcode.react` |
| Password Generator | Live | Web Crypto API |
| Split PDF, Compress PDF, PDF to Image, Watermark PDF | Scaffolded ("Coming soon" page) | extend with `pdf-lib` |
| Image Resizer, Format Converter, Background Remover | Scaffolded | `browser-image-compression` / `canvas` |
| Text Paraphraser, Resume Builder, Invoice Generator | Scaffolded | `jsPDF` for the two builders |

Tools marked "Scaffolded" already have a route, nav entry, card and SEO metadata wired up via
`src/data/tools.js` — they render a "Coming soon" placeholder until you add a real
component to `src/pages/tools/` and register it in `src/pages/ToolRouter.jsx`.

## Folder structure

```
anvil-toolkit/
├── public/
│   └── anvil.svg
├── src/
│   ├── components/
│   │   ├── AdSlot.jsx          # reserved ad placement zones
│   │   ├── FileDropzone.jsx    # shared drag & drop upload zone
│   │   ├── Footer.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx          # search + category mega-menu + theme toggle
│   │   ├── Seo.jsx             # sets document title / meta description
│   │   ├── SearchBar.jsx
│   │   ├── ToolCard.jsx
│   │   └── ToolPageLayout.jsx  # shared shell for every tool page
│   ├── data/
│   │   └── tools.js            # single source of truth: all tools + categories
│   ├── lib/
│   │   └── ThemeContext.jsx    # dark/light mode provider
│   ├── pages/
│   │   ├── tools/
│   │   │   ├── MergePdf.jsx
│   │   │   ├── ImageCompressor.jsx
│   │   │   ├── WordCounter.jsx
│   │   │   ├── CaseConverter.jsx
│   │   │   ├── TextCompare.jsx
│   │   │   ├── QrGenerator.jsx
│   │   │   └── PasswordGenerator.jsx
│   │   ├── About.jsx
│   │   ├── Category.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── Privacy.jsx
│   │   └── ToolRouter.jsx      # maps /tools/:slug to a component
│   ├── App.jsx
│   ├── index.css               # Tailwind v4 theme tokens (colors, fonts)
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Adding a new tool

1. Add an entry to `src/data/tools.js` (slug, name, category, icon, description, `status: 'live'`).
2. Create `src/pages/tools/YourTool.jsx`, wrapping your UI in `<ToolPageLayout tool={tool}>`.
   Use `<FileDropzone />` for file uploads — it already handles drag & drop and click-to-browse.
3. Register the component in `src/pages/ToolRouter.jsx`'s `liveComponents` map.

The tool then automatically appears in search, the homepage grid, the category page,
the navbar mega-menu and the footer — no extra wiring needed.

## Design system

Defined as Tailwind v4 `@theme` tokens in `src/index.css`:

- Display font: Sora (headings) — Body font: Inter
- Accent: ember orange (`--color-ember-500: #F2622E`)
- Light surface: iron (`#FAF8F5` to `#E7E2DA`)
- Dark surface: charcoal (`#14110F` to `#3B332A`)

## Deploying

This is a static Vite build — deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages,
or GitHub Pages. No backend/server is required for any of the live tools.

## Privacy

See `src/pages/Privacy.jsx` — every tool processes files with client-side JavaScript only.
No file is ever uploaded to a server, which is also what to point to when applying for AdSense.
