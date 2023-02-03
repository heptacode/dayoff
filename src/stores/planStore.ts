import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICollection, IEvent, IPlan } from '@/types';

export interface PlanState {
  isLoading: boolean;
  plans: IPlan[];
  planId: string;
  title: string;
  subtitle: string;
  collections: ICollection[];
  collectionId: string;
  events: IEvent[];
  setIsLoading(value: boolean): void;
  setPlans(value: IPlan[]): void;
  setPlanId(value: string): void;
  setTitle(value: string): void;
  setSubtitle(value: string): void;
  setCollections(value: ICollection[]): void;
  setCollectionId(value: string): void;
  setEvents(value: IEvent[]): void;
}

export const usePlanStore = create<PlanState>()(
  devtools(set => ({
    isLoading: true,
    plans: [],
    planId: '',
    title: '',
    subtitle: '',
    collections: [],
    collectionId: '',
    events: [],
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setPlans(value) {
      set({ plans: value });
    },
    setPlanId(value) {
      set({ planId: value });
    },
    setTitle(value) {
      set({ title: value });
    },
    setSubtitle(value) {
      set({ subtitle: value });
    },
    setCollections(value) {
      set({ collections: value });
    },
    setCollectionId(value) {
      set({ collectionId: value });
    },
    setEvents(value) {
      set({ events: value });
    },
  }))
);
