import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IEvent } from '@/types';
import type { ObjectId } from 'mongoose';

export interface EventState {
  isLoading: boolean;
  events: Map<string, IEvent>;
  selectedEvent: IEvent | null;
  getEvents: () => IEvent[];
  getCollectionEvents(collectionIdResolvable: ObjectId | string): IEvent[];
  setIsLoading(value: boolean): void;
  setEvent(eventId: string, value: IEvent): void;
  deleteEvent(eventId: string): void;
  clearEvents(): void;
  setSelectedEvent(value: IEvent): void;
}

export const useEventStore = create<EventState>()(
  devtools((set, get) => ({
    isLoading: true,
    events: new Map(),
    selectedEvent: null,
    getEvents: () => [...get().events.values()],
    getCollectionEvents(collectionIdResolvable) {
      return [...this.events.values()]
        .filter(event => String(event.collectionId) === String(collectionIdResolvable))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setEvent(eventId, value) {
      set({ events: this.events.set(eventId, value) });
    },
    deleteEvent(eventId) {
      this.events.delete(eventId);
      set({ events: new Map(this.events) });
    },
    clearEvents() {
      set({ events: new Map() });
    },
    setSelectedEvent(value) {
      set({ selectedEvent: value });
    },
  }))
);
