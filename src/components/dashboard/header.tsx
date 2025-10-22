'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Download, Filter } from 'lucide-react';

type DashboardHeaderProps = {
  uniqueYears: string[];
  uniqueMonths: string[];
  onAgencyChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
};

export function DashboardHeader({
  uniqueYears,
  uniqueMonths,
  onAgencyChange,
  onYearChange,
  onMonthChange,
}: DashboardHeaderProps) {
  const monthNames: { [key: string]: string } = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Analytics
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select defaultValue="all" onValueChange={onAgencyChange}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filter Agency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agencies</SelectItem>
              <SelectItem value="ExploreWorld">ExploreWorld</SelectItem>
              <SelectItem value="AdventureSeekers">AdventureSeekers</SelectItem>
              <SelectItem value="OceanicGetaways">OceanicGetaways</SelectItem>
              <SelectItem value="SafariVentures">SafariVentures</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all" onValueChange={onYearChange}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all" onValueChange={onMonthChange}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {uniqueMonths.map((month) => (
                <SelectItem key={month} value={month}>
                  {monthNames[month]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
