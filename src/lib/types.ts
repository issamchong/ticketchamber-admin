export interface TourismData {
  agency: string;
  region: string;
  date: string;
  visitors: number;
  revenue: number;
  marketingSpend: number;
  flights: number;
  reservations: number;
  trips: number;
  customers: number;
  tripCategory: 'Cultural' | 'Adventure' | 'Beach' | 'City Break' | 'Safari';
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive';
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  lastPayment: string;
  subscriptionDate: string;
  customers: number;
  reservations: number;
  trips: number;
  flights: number;
}
