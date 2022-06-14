import { createContext, useState } from 'react';

export const MapContext = createContext<any>(null);

export function MapProvider({ children }: any) {
  const [map, setMap] = useState<naver.maps.Map>();

  return <MapContext.Provider value={{ map, setMap }}>{children}</MapContext.Provider>;
}
