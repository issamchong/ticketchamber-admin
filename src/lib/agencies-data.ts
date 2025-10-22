import { Agency } from './types';
import { tourismData } from './data';

const agencyStats = tourismData.reduce(
  (acc, item) => {
    if (!acc[item.agency]) {
      acc[item.agency] = {
        customers: 0,
        reservations: 0,
        trips: 0,
        flights: 0,
      };
    }
    acc[item.agency].customers += item.customers;
    acc[item.agency].reservations += item.reservations;
    acc[item.agency].trips += item.trips;
    acc[item.agency].flights += item.flights;
    return acc;
  },
  {} as {
    [key: string]: {
      customers: number;
      reservations: number;
      trips: number;
      flights: number;
    };
  }
);

export const agenciesData: Agency[] = [
  {
    id: 'exploreworld',
    name: 'ExploreWorld',
    logo: '/logo-exploreworld.svg',
    status: 'active',
    subscriptionPlan: 'Enterprise',
    lastPayment: '2024-05-01',
    subscriptionDate: '2022-01-15',
    ...agencyStats['ExploreWorld'],
  },
  {
    id: 'adventureseekers',
    name: 'AdventureSeekers',
    logo: '/logo-adventureseekers.svg',
    status: 'active',
    subscriptionPlan: 'Pro',
    lastPayment: '2024-05-10',
    subscriptionDate: '2022-03-20',
    ...agencyStats['AdventureSeekers'],
  },
  {
    id: 'oceanicgetaways',
    name: 'OceanicGetaways',
    logo: '/logo-oceanicgetaways.svg',
    status: 'inactive',
    subscriptionPlan: 'Basic',
    lastPayment: '2024-02-15',
    subscriptionDate: '2023-08-01',
    ...agencyStats['OceanicGetaways'],
  },
  {
    id: 'safariventures',
    name: 'SafariVentures',
    logo: '/logo-safariventures.svg',
    status: 'active',
    subscriptionPlan: 'Pro',
    lastPayment: '2024-05-20',
    subscriptionDate: '2022-06-10',
    ...agencyStats['SafariVentures'],
  },
];
