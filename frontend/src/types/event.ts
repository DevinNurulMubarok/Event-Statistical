interface Event {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  availableSeats: number;
  totalSeats: number;
  organizer?: { name: string; avatarUrl: string | null };
}

export type { Event };
