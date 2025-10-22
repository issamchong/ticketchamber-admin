'use client';
import { useState } from 'react';
import { agenciesData } from '@/lib/agencies-data';
import type { Agency } from '@/lib/types';
import { AgencyCard } from '@/components/agencies/agency-card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 3;

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>(agenciesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (
    agencyId: string,
    newStatus: 'active' | 'inactive'
  ) => {
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, status: newStatus } : agency
      )
    );
  };

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAgencies.length / ITEMS_PER_PAGE);
  const paginatedAgencies = filteredAgencies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[580px]">
        {paginatedAgencies.map((agency) => (
          <AgencyCard
            key={agency.id}
            agency={agency}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <PaginationPrevious href="#" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex items-center text-sm font-medium px-4">
              Page {currentPage} of {totalPages}
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <span className="hidden sm:inline">Next</span>
                <PaginationNext href="#" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
