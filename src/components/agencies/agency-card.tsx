'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import type { Agency } from '@/lib/types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { Plane, BedDouble, Briefcase, Users, ToggleLeft, ToggleRight } from 'lucide-react';

type AgencyCardProps = {
  agency: Agency;
  onStatusChange: (
    agencyId: string,
    newStatus: 'active' | 'inactive'
  ) => void;
};

export function AgencyCard({ agency, onStatusChange }: AgencyCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isActive = agency.status === 'active';

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src={agency.logo} alt={`${agency.name} logo`} width={48} height={48} />
          <div>
            <CardTitle>{agency.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  isActive ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              {isActive ? 'Active' : 'Inactive'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 flex-grow">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="grid gap-1">
            <div className="text-muted-foreground">Subscription</div>
            <div className="font-medium">
              <Badge
                variant={
                  agency.subscriptionPlan === 'Enterprise'
                    ? 'default'
                    : agency.subscriptionPlan === 'Pro'
                    ? 'secondary'
                    : 'outline'
                }
              >
                {agency.subscriptionPlan}
              </Badge>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Subscribed On</div>
            <div className="font-medium">{formatDate(agency.subscriptionDate)}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Last Payment</div>
            <div className="font-medium">{formatDate(agency.lastPayment)}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4"/>
                <span>Customers</span>
            </div>
            <div className="font-medium text-right">{formatNumber(agency.customers)}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <BedDouble className="h-4 w-4"/>
                <span>Reservations</span>
            </div>
            <div className="font-medium text-right">{formatNumber(agency.reservations)}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4"/>
                <span>Trips</span>
            </div>
            <div className="font-medium text-right">{formatNumber(agency.trips)}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Plane className="h-4 w-4"/>
                <span>Flights</span>
            </div>
            <div className="font-medium text-right">{formatNumber(agency.flights)}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={isActive ? 'destructive' : 'default'}
          className="w-full"
          onClick={() =>
            onStatusChange(agency.id, isActive ? 'inactive' : 'active')
          }
        >
          {isActive ? <ToggleRight /> : <ToggleLeft />}
          <span>{isActive ? 'Deactivate' : 'Activate'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
