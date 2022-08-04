import DotMarker from '@/components/maps/DotMarker';
import { useMapContext } from '@/contexts/MapContext';
import { getCurrentPosition } from '@/modules/getCurrentPosition';
import { waitForGeocoder } from '@/modules/waitForGeocoder';
import { useRef } from 'react';

export function useMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, setMap } = useMapContext();

  async function initMap() {
    const map: naver.maps.Map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      center: new naver.maps.LatLng(33.3590628, 126.534361),
      zoom: 10,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
    });
    setMap(map);

    try {
      const { coords } = await getCurrentPosition();
      const location = new naver.maps.LatLng(coords.latitude, coords.longitude);

      new naver.maps.Marker({
        map: map,
        position: location,
        icon: {
          content: DotMarker(),
        },
      });
    } catch (error) {}

    await waitForGeocoder();

    new naver.maps.Marker({
      map: map,
      position: naver.maps.TransCoord.fromTM128ToLatLng(new naver.maps.Point(263795, 85782)),
    });
  }

  return { mapRef, initMap };
}
