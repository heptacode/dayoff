import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IEvent } from '@/types';

export interface EventState {
  isLoading: boolean;
  events: Map<string, IEvent[]>;
  setIsLoading(value: boolean): void;
  setEvents(collectionId: string, value: IEvent[]): void;
}

export const useEventStore = create<EventState>()(
  devtools(set => ({
    isLoading: true,
    events: new Map(),
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setEvents(collectionId, value) {
      set({ events: this.events.set(collectionId, value) });
    },
  }))
);
