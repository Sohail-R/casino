import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 border-2 border-ink bg-foreground flex items-center justify-center">
              <span className="font-display text-background text-base leading-none italic">P</span>
            </div>
            <span className="font-display text-xl text-foreground tracking-tight">
              PropInsight
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="text-muted-foreground">/ Dashboard</span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent ring-1 ring-foreground" />
              Live
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-ink bg-card text-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-muted transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </Link>
        </div>
      </div>
    </header>
  )
}
