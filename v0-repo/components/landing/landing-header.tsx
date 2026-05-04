import Link from 'next/link'

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/85 backdrop-blur-md">
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

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em]">
            <a href="#how" className="text-foreground/70 hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#why" className="text-foreground/70 hover:text-foreground transition-colors">
              Why
            </a>
          </nav>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 border-2 border-ink bg-foreground text-background px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Launch app
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
