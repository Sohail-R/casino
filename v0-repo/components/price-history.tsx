import { formatCurrency } from '@/lib/format'

interface PriceHistoryProps {
  history: Array<{
    date: string
    price: number
    event: string
  }>
}

export function PriceHistory({ history }: PriceHistoryProps) {
  if (!history || history.length === 0) return null

  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
        / Price history
      </h4>
      <div className="border-2 border-ink bg-card divide-y-2 divide-foreground">
        {history.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 border-2 border-ink bg-foreground" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                  {item.event}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{item.date}</p>
              </div>
            </div>
            <span className="font-display text-lg text-foreground leading-none">
              {formatCurrency(item.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
