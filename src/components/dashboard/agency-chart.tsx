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

    return Object.entries(agencyRevenue).map(([agency, revenue]) => ({
      agency,
      revenue,
    }));
  }, [data]);

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="agency"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={120}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
