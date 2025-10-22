'use client';

import type { TourismData } from '@/lib/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useMemo } from 'react';

type VisitorChartProps = {
  data: TourismData[];
};

export function VisitorChart({ data }: VisitorChartProps) {
  const chartData = useMemo(() => {
    const monthlyData: { [key: string]: { [key: string]: number } } = {};
    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString('default', {
        month: 'short',
        year: '2-digit',
      });
      if (!monthlyData[month]) {
        monthlyData[month] = {};
      }
      monthlyData[month][item.agency] =
        (monthlyData[month][item.agency] || 0) + item.visitors;
    });

    const agencies = [...new Set(data.map((item) => item.agency))];
    return Object.entries(monthlyData).map(([month, agencyData]) => ({
      month,
      ...Object.fromEntries(
        agencies.map((agency) => [agency, agencyData[agency] || 0])
      ),
    }));
  }, [data]);

  const agencies = [...new Set(data.map((item) => item.agency))];

  const chartConfig = Object.fromEntries(
    agencies.map((agency, i) => [
      agency,
      {
        label: agency,
        color: `hsl(var(--chart-${(i % 5) + 1}))`,
      },
    ])
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => (value > 1000 ? `${value / 1000}k` : value)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {agencies.map((agency) => (
          <Line
            key={agency}
            dataKey={agency}
            type="monotone"
            stroke={`var(--color-${agency})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
