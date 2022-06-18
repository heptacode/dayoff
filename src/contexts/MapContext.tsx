import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface MapState {
  map?: naver.maps.Map;
  setMap: Dispatch<SetStateAction<naver.maps.Map | undefined>>;
}

export const MapContext = createContext<MapState>({} as MapState);

export function MapProvider({ children }: any) {
  const [map, setMap] = useState<naver.maps.Map>();

  return <MapContext.Provider value={{ map, setMap }}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  return useContext(MapContext);
}
