import type { TourismData } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';

type AgencyTableProps = {
  data: TourismData[];
};

export function AgencyTable({ data }: AgencyTableProps) {
  const agencyData = data.reduce((acc, item) => {
    if (!acc[item.agency]) {
      acc[item.agency] = {
        agency: item.agency,
        region: item.region,
        visitors: 0,
        revenue: 0,
      };
    }
    acc[item.agency].visitors += item.visitors;
    acc[item.agency].revenue += item.revenue;
    return acc;
  }, {} as { [key: string]: { agency: string; region: string; visitors: number; revenue: number } });

  const sortedAgencies = Object.values(agencyData).sort(
    (a, b) => b.revenue - a.revenue
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="overflow-auto max-h-[350px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agency</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Visitors</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAgencies.map((item) => (
            <TableRow key={item.agency}>
              <TableCell className="font-medium">{item.agency}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.region}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {item.visitors.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.revenue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
