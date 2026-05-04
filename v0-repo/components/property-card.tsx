'use client'

import { useState } from 'react'
import { Property } from '@/lib/property-schema'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MortgageCalculator } from '@/components/mortgage-calculator'
import { NeighborhoodInsights } from '@/components/neighborhood-insights'
import { PriceHistory } from '@/components/price-history'
import { formatCurrency, formatNumber } from '@/lib/format'

interface PropertyCardProps {
  property: Property
  index?: number
  onRemove: () => void
  onReplace?: () => void
}

export function PropertyCard({ property, index = 0, onRemove, onReplace }: PropertyCardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <article className="border-2 border-ink bg-card overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b-2 border-ink px-5 py-2 bg-foreground text-background">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent ring-1 ring-background" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
            Property {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onReplace && (
            <button
              onClick={onReplace}
              className="flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-colors"
              aria-label="Re-paste source for this property"
              title="Re-paste source"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Re-paste
            </button>
          )}
          <button
            onClick={onRemove}
            className="p-1.5 hover:bg-destructive transition-colors"
            aria-label="Remove property"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b-2 border-ink">
        <h2 className="font-display text-3xl text-foreground tracking-tight leading-tight text-balance">
          {property.address || 'Address unavailable'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {[property.city, property.state, property.zipCode].filter(Boolean).join(', ') || 'Location pending'}
        </p>

        <div className="flex items-baseline gap-3 mt-5">
          <span className="font-display text-5xl text-foreground leading-none">
            {formatCurrency(property.price)}
          </span>
          {property.pricePerSqFt ? (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {formatCurrency(property.pricePerSqFt)} / sqft
            </span>
          ) : null}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 border-b-2 border-ink">
        {[
          property.bedrooms > 0 && { v: property.bedrooms, l: 'Beds' },
          property.bathrooms > 0 && { v: property.bathrooms, l: 'Baths' },
          property.sqft > 0 && { v: formatNumber(property.sqft), l: 'Sqft' },
          property.yearBuilt && property.yearBuilt > 0 && { v: property.yearBuilt, l: 'Built' },
        ]
          .filter((s): s is { v: string | number; l: string } => Boolean(s))
          .map((s, i, arr) => (
            <div
              key={s.l}
              className={`px-4 py-4 ${i < arr.length - 1 ? 'border-r-2 border-ink' : ''}`}
            >
              <p className="font-display text-2xl text-foreground leading-none">{s.v}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                {s.l}
              </p>
            </div>
          ))}
      </div>

      {/* Tabs */}
      <div className="px-6 py-5 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 border-2 border-ink bg-card p-0 h-auto rounded-none">
            <TabsTrigger
              value="overview"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.2em] py-2.5 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.2em] py-2.5 border-l-2 border-ink data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              Financial
            </TabsTrigger>
            <TabsTrigger
              value="neighborhood"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.2em] py-2.5 border-l-2 border-ink data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              Area
            </TabsTrigger>
            <TabsTrigger
              value="calculator"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.2em] py-2.5 border-l-2 border-ink data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-5 space-y-5">
            <DetailSection title="Property details">
              <DetailRow label="Property type" value={property.propertyType} />
              {property.lotSize ? (
                <DetailRow label="Lot size" value={`${formatNumber(property.lotSize)} sqft`} />
              ) : null}
              {property.stories ? (
                <DetailRow label="Stories" value={property.stories} />
              ) : null}
              {property.parkingSpaces ? (
                <DetailRow label="Parking" value={`${property.parkingSpaces} spaces`} />
              ) : null}
            </DetailSection>

            <DetailSection title="Features">
              <div className="flex flex-wrap gap-2">
                {property.hasPool && <FeatureBadge>Pool</FeatureBadge>}
                {property.hasGarage && <FeatureBadge>Garage</FeatureBadge>}
                {property.hasBasement && <FeatureBadge>Basement</FeatureBadge>}
                {property.heatingType && <FeatureBadge>{property.heatingType} heat</FeatureBadge>}
                {property.coolingType && <FeatureBadge>{property.coolingType} cooling</FeatureBadge>}
              </div>
            </DetailSection>

            {property.description && (
              <DetailSection title="Description">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {property.description.slice(0, 300)}
                  {property.description.length > 300 && '…'}
                </p>
              </DetailSection>
            )}

            {property.daysOnMarket !== null && (
              <div className="flex items-center justify-between border-2 border-ink bg-muted px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Days on market
                </span>
                <span className="font-display text-2xl text-foreground leading-none">
                  {property.daysOnMarket}
                </span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="mt-5 space-y-5">
            <DetailSection title="Costs">
              {property.estimatedMortgage && (
                <DetailRow label="Est. monthly payment" value={formatCurrency(property.estimatedMortgage)} highlight />
              )}
              {property.propertyTax && (
                <DetailRow label="Property tax (annual)" value={formatCurrency(property.propertyTax)} />
              )}
              {property.hoaFees && (
                <DetailRow label="HOA (monthly)" value={formatCurrency(property.hoaFees)} />
              )}
            </DetailSection>

            <DetailSection title="Valuations">
              <DetailRow label="List price" value={formatCurrency(property.price)} />
              {property.zestimate && (
                <DetailRow label="Zestimate" value={formatCurrency(property.zestimate)} />
              )}
              {property.rentEstimate && (
                <DetailRow label="Rent estimate" value={`${formatCurrency(property.rentEstimate)} / mo`} />
              )}
            </DetailSection>

            {property.priceHistory && property.priceHistory.length > 0 && (
              <PriceHistory history={property.priceHistory} />
            )}
          </TabsContent>

          <TabsContent value="neighborhood" className="mt-5">
            <NeighborhoodInsights property={property} />
          </TabsContent>

          <TabsContent value="calculator" className="mt-5">
            <MortgageCalculator
              price={property.price}
              propertyTax={property.propertyTax || 0}
              hoaFees={property.hoaFees || 0}
            />
          </TabsContent>
        </Tabs>

        {property.listingUrl && (
          <a
            href={property.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-6 py-3 border-2 border-ink bg-card text-foreground font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            View on Zillow
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
          Scores & estimates are approximations
        </p>
      </div>
    </article>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
        / {title}
      </h4>
      <div className="border-2 border-ink bg-card">{children}</div>
    </div>
  )
}

function DetailRow({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-ink ${
        highlight ? 'bg-accent/30' : ''
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-lg text-foreground leading-none">{value}</span>
    </div>
  )
}

function FeatureBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border-2 border-ink bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
      {children}
    </span>
  )
}
