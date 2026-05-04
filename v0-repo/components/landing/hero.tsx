import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 noise pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-accent ring-2 ring-foreground" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
            Vol. 01 · Issue 26 — Real-estate intelligence
          </span>
        </div>

        {/* Massive editorial headline */}
        <h1 className="font-display text-foreground tracking-tight leading-[0.88] text-balance">
          <span className="block text-[15vw] sm:text-[12vw] lg:text-[10rem] xl:text-[12rem]">
            Buy the right
          </span>
          <span className="block text-[15vw] sm:text-[12vw] lg:text-[10rem] xl:text-[12rem]">
            <em className="font-display italic text-foreground">house</em>
            <span className="inline-block mx-3 sm:mx-6 align-middle">
              <span className="inline-block bg-accent border-2 border-ink px-3 sm:px-6 py-0 sm:py-1 -rotate-2 align-middle">
                <span className="text-foreground">not the</span>
              </span>
            </span>
          </span>
          <span className="block text-[15vw] sm:text-[12vw] lg:text-[10rem] xl:text-[12rem]">
            pretty <em className="font-display italic">one</em>.
          </span>
        </h1>

        {/* Sub copy + meta */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="text-foreground text-xl sm:text-2xl leading-snug max-w-2xl text-pretty">
              PropInsight rips the data out of any Zillow listing and lays two
              homes side-by-side — price, taxes, mortgage, schools, walkability —
              so the better deal is impossible to miss.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="w-8 h-px bg-foreground" />
              <span>Scroll to learn how</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 border-2 border-ink bg-card">
          {[
            { k: '< 5s', v: 'Time to insight' },
            { k: '40+', v: 'Data points / home' },
            { k: '2', v: 'Side-by-side homes' },
            { k: '$0', v: 'To get started' },
          ].map((s, i) => (
            <div
              key={s.v}
              className={`px-5 py-6 ${i < 3 ? 'border-r-2 border-ink' : ''} ${i < 2 ? 'sm:border-r-2' : ''} ${i === 1 ? 'border-r-0 sm:border-r-2' : ''} ${i < 2 ? 'border-b-2 sm:border-b-0' : ''} border-ink`}
            >
              <p className="font-display text-4xl sm:text-5xl text-foreground leading-none">
                {s.k}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.v}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 border-2 border-ink bg-foreground text-background px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Open the analyzer
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-2 border-2 border-ink bg-card text-foreground px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] hover:bg-muted transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}
