import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MapState {
  map?: naver.maps.Map;
  setMap(value: naver.maps.Map): void;
}

export const useMapStore = create<MapState>()(
  devtools(set => ({
    map: undefined,
    setMap(value) {
      set({ map: value });
    },
  }))
);
