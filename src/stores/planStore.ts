import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IPlan, MapType } from '@/types';

export interface PlanState {
  isLoading: boolean;
  plans: IPlan[];
  planId: string | null;
  title: string;
  subtitle: string;
  mapType: MapType | null;
  setIsLoading(value: boolean): void;
  setPlans(value: IPlan[]): void;
  setPlanId(value: string | null): void;
  setTitle(value: string): void;
  setSubtitle(value: string): void;
  setMapType(value: MapType): void;
}

export const usePlanStore = create<PlanState>()(
  devtools(set => ({
    isLoading: true,
    plans: [],
    planId: null,
    title: '',
    subtitle: '',
    mapType: null,
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
    setMapType(value) {
      set({ mapType: value });
    },
  }))
);
