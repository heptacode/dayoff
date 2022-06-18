export enum EventType {
  Airplane = 'Airplane',
  Bus = 'Bus',
  Train = 'Train',
  Transfer = 'Transfer',
  Eat = 'Eat',
  Place = 'Place',
  Sleep = 'Sleep',
}

export interface Event {
  type: EventType;
  title: string;
  subtitle: string;
  description: string;
  date: string | null;
  time: string | null;
  lat: number | null;
  lng: number | null;
}
