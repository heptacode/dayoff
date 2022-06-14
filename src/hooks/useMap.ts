import DotMarker from '@/components/DotMarker';
import { MapContext } from '@/contexts/MapContext';
import { getCurrentPosition } from '@/modules/getCurrentPosition';
import { useContext, useRef } from 'react';

export function useMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, setMap } = useContext(MapContext);

  async function initMap() {
    const map: naver.maps.Map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      center: new naver.maps.LatLng(33.3590628, 126.534361),
      zoom: 10,
      scaleControl: false,
    });
    setMap(map);

    const position = await getCurrentPosition();
    const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

    new naver.maps.Marker({
      map: map,
      position: location,
      icon: {
        content: DotMarker(),
        size: new naver.maps.Size(22, 35),
      },
    });
  }

  return { mapRef, initMap };
}
