import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IEvent } from '@/types';

export interface EventState {
  isLoading: boolean;
  events: Map<string, Map<string, IEvent>>;
  selectedEvent: IEvent | null;
  setIsLoading(value: boolean): void;
  setEvents(collectionId: string, eventId: string, value: IEvent): void;
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
    setEvents(collectionId, eventId, value) {
      if (this.events.has(collectionId)) {
        set({
          events: this.events.set(collectionId, this.events.get(collectionId)!.set(eventId, value)),
        });
      } else {
        set({ events: this.events.set(collectionId, new Map([[eventId, value]])) });
      }
    },
    setSelectedEvent(value) {
      set({ selectedEvent: value });
    },
  }))
);
