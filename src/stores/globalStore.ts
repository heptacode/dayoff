import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GlobalState {
  isSidebarOpen: boolean;
  setIsSidebarOpen(value: boolean): void;
  userLocation?: GeolocationPosition;
  setUserLocation(value: GeolocationPosition): void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(set => ({
    isSidebarOpen: true,
    setIsSidebarOpen(value) {
      set({ isSidebarOpen: value });
    },
    userLocation: undefined,
    setUserLocation(value: GeolocationPosition) {
      set({ userLocation: value });
    },
  }))
);
