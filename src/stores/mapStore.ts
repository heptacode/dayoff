import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MapState {
  map: naver.maps.Map | null;
  markers: Map<string, naver.maps.Marker>;
  polylines: naver.maps.Polyline[];
  setMap(value: naver.maps.Map): void;
  setMarker(eventId: string, value: naver.maps.Marker): void;
  setPolylines(value: naver.maps.Polyline[]): void;
}

export const useMapStore = create<MapState>()(
  devtools(set => ({
    map: null,
    markers: new Map(),
    polylines: [],
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
