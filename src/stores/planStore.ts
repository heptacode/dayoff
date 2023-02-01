import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICollection, IPlan } from '@/types';

export interface PlanState {
  isLoading: boolean;
  plans: IPlan[];
  planId: string;
  title: string;
  subtitle: string;
  collections: ICollection[];
  setIsLoading(value: boolean): void;
  setPlans(value: IPlan[]): void;
  setPlanId(value: string): void;
  setTitle(value: string): void;
  setSubtitle(value: string): void;
  setCollections(value: ICollection[]): void;
}

export const usePlanStore = create<PlanState>()(
  devtools(set => ({
    isLoading: true,
    plans: [],
    planId: '',
    title: '',
    subtitle: '',
    collections: [],
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
  }))
);
