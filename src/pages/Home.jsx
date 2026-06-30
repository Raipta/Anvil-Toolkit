import { Link } from 'react-router-dom'
import { ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import ToolCard from '../components/ToolCard'
import AdSlot from '../components/AdSlot'
import Seo from '../components/Seo'
import { categories, tools, toolsByCategory } from '../data/tools'

const categoryIcons = {
  pdf: '📄',
  image: '🖼️',
  text: '✍️',
  generators: '⚡',
}

export default function Home() {
  return (
    <>
      <Seo
        title="Free Online Tools for PDFs, Images, Text & More"
        description="Anvil is a free toolkit of 17 browser-based utilities — merge PDFs, compress images, generate QR codes, build resumes and more. Nothing leaves your device."
      />

      <section className="hammered relative overflow-hidden border-b border-ink-900/8 bg-gradient-to-b from-iron-100 to-iron-50 dark:border-iron-100/8 dark:from-char-900 dark:to-char-950">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-ember-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs font-semibold text-ember-600 dark:text-ember-300">
            17 tools · 100% client-side · always free
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 dark:text-iron-100 sm:text-5xl lg:text-6xl">
            Tools forged for your<br className="hidden sm:block" /> everyday <span className="text-ember-500">grind.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-900/60 dark:text-iron-100/60 sm:text-lg">
            Merge PDFs, compress images, generate QR codes and more — every tool runs right in your browser. No uploads, no waiting rooms, no servers reading your files.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-900/50 dark:text-iron-100/45">
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-ember-500" /> Private by design</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-ember-500" /> Instant processing</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-ember-500" /> No sign-up needed</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdSlot variant="banner" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-iron-100">Browse by category</h2>
        <p className="mt-1 text-sm text-ink-900/55 dark:text-iron-100/50">Four workshops, one toolbox.</p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-char-900 to-char-700 p-6 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ember-500/20"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ember-500/20 blur-2xl transition group-hover:bg-ember-500/35" />
              <span className="text-3xl">{categoryIcons[c.id]}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-iron-200/70">{toolsByCategory(c.id).length} tools</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ember-300">
                Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-iron-100">All tools</h2>
        <p className="mt-1 text-sm text-ink-900/55 dark:text-iron-100/50">Pick a tool and get straight to it — no account required.</p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </>
  )
}
