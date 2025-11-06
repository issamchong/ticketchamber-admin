'use client';

import { useState, useMemo } from 'react';
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
import { MonthlyRevenueChart } from '@/components/dashboard/monthly-revenue-chart';
import { TripCategoryChart } from '@/components/dashboard/trip-category-chart';

export default function Home() {
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const { uniqueYears, uniqueMonths } = useMemo(() => {
    const years = new Set<string>();
    const months = new Set<string>();
    tourismData.forEach((item) => {
      const date = new Date(item.date);
      years.add(date.getFullYear().toString());
      months.add((date.getMonth() + 1).toString().padStart(2, '0'));
    });
    const sortedMonths = Array.from(months).sort();
    return {
      uniqueYears: Array.from(years).sort((a, b) => Number(b) - Number(a)),
      uniqueMonths: sortedMonths,
    };
  }, []);

  const filteredData = useMemo(() => {
    return tourismData.filter((item) => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear().toString();
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, '0');

      const agencyMatch =
        selectedAgency === 'all' || item.agency === selectedAgency;
      const yearMatch = selectedYear === 'all' || itemYear === selectedYear;
      const monthMatch = selectedMonth === 'all' || itemMonth === selectedMonth;

      return agencyMatch && yearMatch && monthMatch;
    });
  }, [selectedAgency, selectedYear, selectedMonth]);

  const data: TourismData[] = filteredData;

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const uniqueAgencies = new Set(data.map((item) => item.agency)).size;
  const totalFlights = data.reduce((sum, item) => sum + item.flights, 0);
  const totalReservations = data.reduce(
    (sum, item) => sum + item.reservations,
    0
  );
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
      <DashboardHeader
        uniqueYears={uniqueYears}
        uniqueMonths={uniqueMonths}
        onAgencyChange={setSelectedAgency}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Agency</CardTitle>
          </CardHeader>
          <CardContent>
            <AgencyChart data={data} />
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
