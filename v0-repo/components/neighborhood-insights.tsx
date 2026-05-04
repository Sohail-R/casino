import { Property } from '@/lib/property-schema'

interface NeighborhoodInsightsProps {
  property: Property
}

export function NeighborhoodInsights({ property }: NeighborhoodInsightsProps) {
  const hasAnyData =
    property.walkScore ||
    property.transitScore ||
    property.bikeScore ||
    property.schoolRating ||
    property.crimeIndex

  return (
    <div className="space-y-5">
      {/* Disclaimer */}
      <div className="border-2 border-ink bg-muted px-4 py-3 flex items-start gap-3">
        <svg
          className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] leading-relaxed text-muted-foreground">
          Scores are estimates based on location & price. Visit Zillow for official data.
        </p>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-3 border-2 border-ink bg-card">
        <ScoreCell label="Walk" score={property.walkScore} />
        <ScoreCell label="Transit" score={property.transitScore} divider />
        <ScoreCell label="Bike" score={property.bikeScore} divider />
      </div>

      {/* School Rating */}
      {property.schoolRating && (
        <div className="border-2 border-ink bg-card overflow-hidden">
          <div className="border-b-2 border-ink px-4 py-2 bg-muted flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
              School rating
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Avg nearby
            </span>
          </div>
          <div className="p-4 flex items-end justify-between">
            <span className="font-display text-5xl text-foreground leading-none">
              {property.schoolRating}
              <span className="font-display text-2xl text-muted-foreground">/10</span>
            </span>
          </div>
          <div className="h-2 border-t-2 border-ink bg-card relative">
            <div
              className="absolute inset-y-0 left-0 bg-foreground"
              style={{ width: `${property.schoolRating * 10}%` }}
            />
          </div>
        </div>
      )}

      {/* Crime */}
      {property.crimeIndex && (
        <div className="border-2 border-ink bg-card flex items-center justify-between px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
            Crime level
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.2em] border-2 border-ink px-2 py-1 ${
              property.crimeIndex === 'Low'
                ? 'bg-success text-success-foreground'
                : property.crimeIndex === 'Medium'
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-destructive text-destructive-foreground'
            }`}
          >
            {property.crimeIndex}
          </span>
        </div>
      )}

      {/* Empty */}
      {!hasAnyData && (
        <div className="border-2 border-ink bg-card text-center py-10 px-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            No neighborhood data available
          </p>
        </div>
      )}
    </div>
  )
}

function ScoreCell({ label, score, divider }: { label: string; score: number | null; divider?: boolean }) {
  return (
    <div className={`p-5 ${divider ? 'border-l border-soft' : ''}`}>
      <p className="font-display text-4xl text-foreground leading-none">
        {score ?? '—'}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
        {label} score
      </p>
    </div>
  )
}
