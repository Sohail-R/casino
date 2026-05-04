'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface ComparisonChartProps {
  data: Array<{
    name: string
    property1: number
    property2: number
  }>
  title: string
  subtitle?: string
}

export function ComparisonChart({ data, title, subtitle }: ComparisonChartProps) {
  return (
    <div className="border-2 border-ink bg-card overflow-hidden">
      <div className="border-b-2 border-ink px-4 py-2 bg-muted flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>

      <div className="h-64 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="var(--border-soft)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: 'var(--foreground)', strokeWidth: 2 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'color-mix(in oklch, var(--foreground) 6%, transparent)' }}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '2px solid var(--foreground)',
                borderRadius: 0,
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--muted-foreground)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '12px' }}
              formatter={value => (
                <span
                  style={{
                    color: 'var(--muted-foreground)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                  }}
                >
                  {value === 'property1' ? 'Property 01' : 'Property 02'}
                </span>
              )}
            />
            <Bar dataKey="property1" fill="var(--chart-1)" name="property1" />
            <Bar dataKey="property2" fill="var(--chart-2)" name="property2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
