import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface GlobalState {
  userLocation?: GeolocationPosition;
  setUserLocation(value: GeolocationPosition): void;
  isSidebarOpen: boolean;
  setIsSidebarOpen(value: boolean): void;
  isProjectEditModalOpen: boolean;
  setIsProjectEditModalOpen(value: boolean): void;
  isEventEditModalOpen: boolean;
  setIsEventEditModalOpen(value: boolean): void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    devtools(set => ({
      userLocation: undefined,
      setUserLocation(value: GeolocationPosition) {
        set({ userLocation: value });
      },
      isSidebarOpen: true,
      setIsSidebarOpen(value) {
        set({ isSidebarOpen: value });
      },
      isEventEditModalOpen: false,
      setIsEventEditModalOpen(value) {
        set({ isEventEditModalOpen: value });
      },
      isProjectEditModalOpen: false,
      setIsProjectEditModalOpen(value) {
        set({ isProjectEditModalOpen: value });
      },
    })),
    {
      name: 'global',
      partialize: state => ({
        userLocation: {
          coords: {
            altitude: state.userLocation?.coords.altitude,
            heading: state.userLocation?.coords.heading,
            latitude: state.userLocation?.coords.latitude,
            longitude: state.userLocation?.coords.longitude,
            speed: state.userLocation?.coords.speed,
          },
          timestamp: state.userLocation?.timestamp,
        },
      }),
    }
  )
);
