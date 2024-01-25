import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useCollectionStore } from '../collections/useCollectionStore';
import type { Event } from '@/types';
import type { ObjectId } from 'mongoose';

export interface EventState {
  isLoading: boolean;
  events: Record<string, Event>;
  selectedEventId: string | null;
  updatedAt: Date;
  getEvents: () => Event[];
  getActiveEvents: () => Event[];
  getCollectionEvents(collectionIdResolvable: ObjectId | string): Event[];
  setIsLoading(value: boolean): void;
  setEvent(eventId: string, value: Event): void;
  setEventTitle(eventId: string, value: string): void;
  setEventDescription(eventId: string, value: string): void;
  setEventDate(eventId: string, value: string): void;
  deleteEvent(eventId: string): void;
  clearEvents(): void;
  setSelectedEventId(value: string): void;
}

export const useEventStore = create<EventState>()(
  devtools((set, get) => ({
    isLoading: true,
    events: {},
    selectedEventId: null,
    updatedAt: new Date(),
    getEvents: () => Object.values(get().events),
    getActiveEvents: () =>
      Object.values(get().events).filter(event =>
        useCollectionStore.getState().selectedCollectionIds.includes(String(event.collectionId)),
      ),
    getCollectionEvents(collectionIdResolvable) {
      return get()
        .getEvents()
        .filter(event => String(event.collectionId) === String(collectionIdResolvable))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setEvent(eventId, value) {
      set({
        events: {
          ...get().events,
          [eventId]: value,
        },
      });
      set({ updatedAt: new Date() });
    },
    setEventTitle(eventId, value) {
      set({
        events: {
          ...get().events,
          [eventId]: {
            ...get().events[eventId],
            title: value,
          },
        },
      });
      set({ updatedAt: new Date() });
    },
    setEventDescription(eventId, value) {
      set({
        events: {
          ...get().events,
          [eventId]: {
            ...get().events[eventId],
            description: value,
          },
        },
      });
      set({ updatedAt: new Date() });
    },
    setEventDate(eventId, value) {
      set({
        events: {
          ...get().events,
          [eventId]: {
            ...get().events[eventId],
            date: value,
          },
        },
      });
      set({ updatedAt: new Date() });
    },
    deleteEvent(eventId) {
      delete get().events[eventId];
      set({ updatedAt: new Date() });
    },
    clearEvents() {
      set({ events: {} });
      set({ updatedAt: new Date() });
    },
    setSelectedEventId(value) {
      set({ selectedEventId: value });
    },
  })),
);
