import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IEvent } from '@/types';

export interface EventState {
  isLoading: boolean;
  events: Map<string, IEvent>;
  selectedEvent: IEvent | null;
  setIsLoading(value: boolean): void;
  setEvent(eventId: string, value: IEvent): void;
  deleteEvent(eventId: string): void;
  clearEvents(): void;
  setSelectedEvent(value: IEvent): void;
}

export const useEventStore = create<EventState>()(
  devtools(set => ({
    isLoading: true,
    events: new Map(),
    selectedEvent: null,
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
