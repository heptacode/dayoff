import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IPlan } from '@/types';

export interface PlanState {
  isLoading: boolean;
  plans: IPlan[];
  planId: string;
  title: string;
  subtitle: string;
  setIsLoading(value: boolean): void;
  setPlans(value: IPlan[]): void;
  setPlanId(value: string): void;
  setTitle(value: string): void;
  setSubtitle(value: string): void;
}

export const usePlanStore = create<PlanState>()(
  devtools(set => ({
    isLoading: true,
    plans: [],
    planId: '',
    title: '',
    subtitle: '',
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
  }))
);
