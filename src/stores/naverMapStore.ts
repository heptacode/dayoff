import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface NaverMapState {
  map: naver.maps.Map | null;
  markers: Map<string, naver.maps.Marker>;
  polylines: naver.maps.Polyline[];
  getMarkers: () => naver.maps.Marker[];
  setMap(value: naver.maps.Map | null): void;
  setMarker(eventId: string, value: naver.maps.Marker): void;
  setPolylines(value: naver.maps.Polyline[]): void;
}

export const useNaverMapStore = create<NaverMapState>()(
  devtools((set, get) => ({
    map: null,
    markers: new Map(),
    polylines: [],
    getMarkers: () => [...get().markers.values()],
    setMap(value) {
      set({ map: value });
    },
    setMarker(eventId, value) {
      set({ markers: new Map(this.markers.set(eventId, value)) });
    },
    setPolylines(value) {
      set({ polylines: value });
    },
  }))
);
