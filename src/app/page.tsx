import { tourismData } from '@/lib/data';
import type { TourismData } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { VisitorChart } from '@/components/dashboard/visitor-chart';
import { AgencyChart } from '@/components/dashboard/agency-chart';
import { AgencyTable } from '@/components/dashboard/agency-table';
import { AiAnalysis } from '@/components/dashboard/ai-analysis';

export default function Home() {
  const data: TourismData[] = tourismData;

  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const uniqueAgencies = new Set(data.map((item) => item.agency)).size;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Total Visitors"
          value={formatNumber(totalVisitors)}
          description="Across all agencies"
        />
        <KpiCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="From all tourism activities"
        />
        <KpiCard
          title="Active Agencies"
          value={uniqueAgencies.toString()}
          description="Currently reporting data"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorChart data={data} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>AI-Powered Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <AiAnalysis data={data} />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Agency</CardTitle>
          </CardHeader>
          <CardContent>
            <AgencyChart data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <AgencyTable data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
