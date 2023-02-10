import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GoogleMapState {
  map: google.maps.Map | null;
  markers: Map<string, google.maps.Marker>;
  polylines: google.maps.Polyline[];
  getMarkers: () => google.maps.Marker[];
  setMap(value: google.maps.Map): void;
  setMarker(eventId: string, value: google.maps.Marker): void;
  setPolylines(value: google.maps.Polyline[]): void;
}

export const useGoogleMapStore = create<GoogleMapState>()(
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
