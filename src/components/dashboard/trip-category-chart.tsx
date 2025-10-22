'use client';

import type { TourismData } from '@/lib/types';
import { useMemo } from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

type TripCategoryChartProps = {
  data: TourismData[];
};

export function TripCategoryChart({ data }: TripCategoryChartProps) {
  const chartData = useMemo(() => {
    const categoryCounts: { [key: string]: number } = {};
    data.forEach((item) => {
      categoryCounts[item.tripCategory] =
        (categoryCounts[item.tripCategory] || 0) + item.trips;
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
      fill: `var(--color-${name.toLowerCase().replace(' ', '')})`,
    }));
  }, [data]);

  const chartConfig = {
    value: {
      label: 'Trips',
    },
    cultural: {
      label: 'Cultural',
      color: 'hsl(var(--chart-1))',
    },
    adventure: {
      label: 'Adventure',
      color: 'hsl(var(--chart-2))',
    },
    beach: {
      label: 'Beach',
      color: 'hsl(var(--chart-3))',
    },
    citybreak: {
      label: 'City Break',
      color: 'hsl(var(--chart-4))',
    },
    safari: {
      label: 'Safari',
      color: 'hsl(var(--chart-5))',
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[300px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
