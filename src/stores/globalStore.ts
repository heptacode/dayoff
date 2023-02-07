import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GlobalState {
  userLocation?: GeolocationPosition;
  setUserLocation(value: GeolocationPosition): void;
  isSidebarOpen: boolean;
  setIsSidebarOpen(value: boolean): void;
  isCollectionEditModalOpen: boolean;
  setIsCollectionEditModalOpen(value: boolean): void;
  isEventEditModalOpen: boolean;
  setIsEventEditModalOpen(value: boolean): void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(set => ({
    userLocation: undefined,
    setUserLocation(value: GeolocationPosition) {
      set({ userLocation: value });
    },
    isSidebarOpen: true,
    setIsSidebarOpen(value) {
      set({ isSidebarOpen: value });
    },
    isCollectionEditModalOpen: false,
    setIsCollectionEditModalOpen(value) {
      set({ isCollectionEditModalOpen: value });
    },
    isEventEditModalOpen: false,
    setIsEventEditModalOpen(value) {
      set({ isEventEditModalOpen: value });
    },
  }))
);
