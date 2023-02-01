import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MapState {
  map?: naver.maps.Map;
  setMap(value: naver.maps.Map): void;
  userLocation?: GeolocationPosition;
  setUserLocation(value: GeolocationPosition): void;
}

export const useMapStore = create<MapState>()(
  devtools(set => ({
    map: undefined,
    setMap(value) {
      console.log(value);
      set({ map: value });
    },
    userLocation: undefined,
    setUserLocation(value: GeolocationPosition) {
      set({ userLocation: value });
    },
  }))
);
