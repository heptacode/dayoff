import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GlobalState {
  isSidebarOpen: boolean;
  setIsSidebarOpen(value: boolean): void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(set => ({
    isSidebarOpen: true,
    setIsSidebarOpen(value) {
      set({ isSidebarOpen: value });
    },
  }))
);
