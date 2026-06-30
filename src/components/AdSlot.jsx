// Reserved ad slot. Swap the inner div for your AdSense <ins> tag once approved.
// Keeping a fixed-height placeholder prevents layout shift (good for CLS / UX / AdSense review).
export default function AdSlot({ variant = 'banner', className = '' }) {
  const sizes = {
    banner: 'h-[90px] w-full max-w-[728px]',
    sidebar: 'h-[250px] w-full max-w-[300px]',
    inline: 'h-[100px] w-full',
  }

  return (
    <div className={`mx-auto ${sizes[variant]} ${className}`}>
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-ink-900/10 bg-ink-900/[0.03] text-xs uppercase tracking-wider text-ink-900/30 dark:border-iron-100/10 dark:bg-iron-100/[0.03] dark:text-iron-100/30">
        Ad space
      </div>
    </div>
  )
}
