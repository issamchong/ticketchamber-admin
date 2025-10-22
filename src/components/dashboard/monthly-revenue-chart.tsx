'use client';

import type { TourismData } from '@/lib/types';
import { useMemo } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type MonthlyRevenueChartProps = {
  data: TourismData[];
};

export function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  const chartData = useMemo(() => {
    const monthlyRevenue: { [key: string]: number } = {};
    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString('default', {
        month: 'short',
        year: '2-digit',
      });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + item.revenue;
    });

    const sortedMonths = Object.keys(monthlyRevenue).sort((a, b) => {
      const dateA = new Date(`01 ${a}`);
      const dateB = new Date(`01 ${b}`);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedMonths.map((month) => ({
      month,
      revenue: monthlyRevenue[month],
    }));
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
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={60}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact'
                }).format(value as number)
              }
            />
          }
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
