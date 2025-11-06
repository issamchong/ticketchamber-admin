'use client';

import type { TourismData } from '@/lib/types';
import { useMemo } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type AgencyChartProps = {
  data: TourismData[];
};

export function AgencyChart({ data }: AgencyChartProps) {
  const chartData = useMemo(() => {
    const agencyRevenue: { [key: string]: number } = {};
    data.forEach((item) => {
      agencyRevenue[item.agency] =
        (agencyRevenue[item.agency] || 0) + item.revenue;
    });

    return Object.entries(agencyRevenue)
      .map(([agency, revenue]) => ({
        agency,
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [data]);

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" hide tickFormatter={formatCurrency} />
        <YAxis
          dataKey="agency"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={120}
          dy={-5}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                }).format(value as number)
              }
            />
          }
        />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
