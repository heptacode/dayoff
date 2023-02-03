import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IEvent } from '@/types';

export interface EventState {
  isLoading: boolean;
  events: IEvent[];
  setIsLoading(value: boolean): void;
  setEvents(value: IEvent[]): void;
}

export const useEventStore = create<EventState>()(
  devtools(set => ({
    isLoading: true,
    events: [],
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setEvents(value) {
      set({ events: value });
    },
  }))
);
