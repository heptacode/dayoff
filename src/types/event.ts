export enum EventType {
  Airplane = 'Airplane',
  Bus = 'Bus',
  Train = 'Train',
  Transfer = 'Transfer',
  Eat = 'Eat',
  Place = 'Place',
  Sleep = 'Sleep',
}

export interface EventGroup {
  title: string | null;
  subtitle: string | null;
  date: Date | string | null;
  events: Event[];
}

export interface Event {
  date: Date | string | null;
  title: string;
  subtitle: string;
  description: string;
  lat: number | null;
  lng: number | null;
}
