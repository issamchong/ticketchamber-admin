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
import { AgencyChart } from '@/components/dashboard/agency-chart';
import { AgencyTable } from '@/components/dashboard/agency-table';
import { MonthlyRevenueChart } from '@/components/dashboard/monthly-revenue-chart';
import { TripCategoryChart } from '@/components/dashboard/trip-category-chart';

export default function Home() {
  const data: TourismData[] = tourismData;

  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const uniqueAgencies = new Set(data.map((item) => item.agency)).size;
  const totalFlights = data.reduce((sum, item) => sum + item.flights, 0);
  const totalReservations = data.reduce((sum, item) => sum + item.reservations, 0);
  const totalTrips = data.reduce((sum, item) => sum + item.trips, 0);
  const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <KpiCard
          title="Total Flights"
          value={formatNumber(totalFlights)}
          description="Across all regions"
        />
        <KpiCard
          title="Reservations"
          value={formatNumber(totalReservations)}
          description="Total bookings made"
        />
        <KpiCard
          title="Total Trips"
          value={formatNumber(totalTrips)}
          description="Completed excursions"
        />
        <KpiCard
          title="Customers"
          value={formatNumber(totalCustomers)}
          description="Total unique customers"
        />
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyRevenueChart data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trips by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <TripCategoryChart data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
