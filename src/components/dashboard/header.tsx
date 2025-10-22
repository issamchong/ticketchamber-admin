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

export function DashboardHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select defaultValue="all-agencies">
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filter Agency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-agencies">All Agencies</SelectItem>
              <SelectItem value="explore-world">ExploreWorld</SelectItem>
              <SelectItem value="adventure-seekers">AdventureSeekers</SelectItem>
              <SelectItem value="oceanic-getaways">OceanicGetaways</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filter Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-12-months">Last 12 months</SelectItem>
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
