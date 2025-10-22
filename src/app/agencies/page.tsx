'use client';
import { useState } from 'react';
import { agenciesData } from '@/lib/agencies-data';
import type { Agency } from '@/lib/types';
import { AgencyCard } from '@/components/agencies/agency-card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>(agenciesData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (agencyId: string, newStatus: 'active' | 'inactive') => {
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, status: newStatus } : agency
      )
    );
  };

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            Agencies
          </h1>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agencies..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgencies.map((agency) => (
          <AgencyCard
            key={agency.id}
            agency={agency}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
