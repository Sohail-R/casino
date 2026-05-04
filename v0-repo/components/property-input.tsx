'use client'

import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface PropertyInputProps {
  onSubmit: (url: string, pageContent?: string) => void
  isLoading: boolean
  propertyCount: number
  needsManualInput?: boolean
  manualInputInstructions?: string[]
  pendingUrl?: string
  duplicateWarning?: string | null
  replaceMode?: boolean
  onCancelReplace?: () => void
}

export function PropertyInput({
  onSubmit,
  isLoading,
  propertyCount,
  needsManualInput,
  manualInputInstructions,
  pendingUrl,
  duplicateWarning,
  replaceMode,
  onCancelReplace,
}: PropertyInputProps) {
  const [url, setUrl] = useState('')
  const [pageContent, setPageContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim() && !isLoading) {
      onSubmit(url.trim())
    }
  }

  const handlePasteSubmit = () => {
    if (pageContent.trim() && pendingUrl) {
      onSubmit(pendingUrl, pageContent.trim())
      setPageContent('')
    }
  }

  const isValidZillowUrl = url.includes('zillow.com')

  // PASTE MODE
  if (needsManualInput) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="border-2 border-ink bg-card">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3 bg-foreground text-background">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
              {duplicateWarning ? 'Duplicate detected' : 'Manual input required'}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/60">
              Step 02
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Headline */}
            <h3 className="font-display text-3xl text-foreground tracking-tight leading-tight mb-2">
              {duplicateWarning ? 'That looks like the same listing.' : 'Zillow blocks automated requests.'}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {duplicateWarning
                ? 'No worries — re-paste a fresh page source for the second property and we\'ll extract its real data.'
                : 'No worries — paste the page source and we\'ll pull the real numbers ourselves.'}
            </p>

            {/* Duplicate warning callout */}
            {duplicateWarning && (
              <div className="mt-5 border-2 border-ink bg-accent/30 px-4 py-3 flex gap-3">
                <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-foreground leading-relaxed">
                  {duplicateWarning}
                </div>
              </div>
            )}

            {/* Steps */}
            {manualInputInstructions && manualInputInstructions.length > 0 && (
              <div className="mt-6 border-2 border-ink">
                <div className="border-b-2 border-ink px-4 py-2 bg-muted">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
                    Quick steps
                  </span>
                </div>
                <ol className="divide-y-2 divide-foreground">
                  {manualInputInstructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-4 px-4 py-3">
                      <span className="font-display text-xl text-foreground leading-none flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-foreground/80 leading-relaxed">
                        {instruction.replace(/^\d+\.\s*/, '')}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Textarea */}
            <textarea
              value={pageContent}
              onChange={e => setPageContent(e.target.value)}
              placeholder="Paste the page source here (Ctrl+V / Cmd+V)..."
              className="w-full h-44 mt-6 p-4 bg-input border-2 border-ink font-mono text-xs resize-none focus:outline-none focus:bg-card focus:ring-0 placeholder:text-muted-foreground"
            />

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handlePasteSubmit}
                disabled={!pageContent.trim() || isLoading}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 border-2 border-ink bg-foreground text-background px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Extracting…
                  </>
                ) : (
                  <>
                    Extract data
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
              {(replaceMode || onCancelReplace) && (
                <button
                  onClick={onCancelReplace}
                  className="border-2 border-ink bg-card text-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // URL INPUT MODE
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {replaceMode && (
        <div className="mb-4 border-2 border-ink bg-accent/40 px-4 py-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
            Replace mode · paste a new Zillow link below
          </span>
          {onCancelReplace && (
            <button
              type="button"
              onClick={onCancelReplace}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground underline underline-offset-4 hover:text-foreground/70"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <div className="border-2 border-ink bg-card focus-within:bg-card transition-colors">
        <div className="flex items-center border-b-2 border-ink px-4 py-2 bg-muted">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
            Step 01 — Paste a Zillow URL
          </span>
        </div>

        <div className="flex items-stretch">
          <div className="flex items-center justify-center w-14 border-r-2 border-ink">
            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>

          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.zillow.com/homedetails/..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-foreground placeholder:text-muted-foreground text-base font-mono"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !url.trim() || !isValidZillowUrl}
            className="flex items-center gap-2 border-l-2 border-ink bg-foreground text-background px-6 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Spinner className="w-4 h-4" />
                Working
              </>
            ) : (
              <>
                Analyze
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slot indicator */}
      <div className="flex items-center justify-center gap-6 mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 border-2 border-ink ${propertyCount >= 1 ? 'bg-foreground' : 'bg-card'}`} />
          Property 01
        </span>
        <span className="w-8 h-px bg-foreground" />
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 border-2 border-ink ${propertyCount >= 2 ? 'bg-foreground' : 'bg-card'}`} />
          Property 02
        </span>
      </div>

      {url && !isValidZillowUrl && (
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-destructive mt-4">
          Please enter a valid Zillow URL
        </p>
      )}
    </form>
  )
}
