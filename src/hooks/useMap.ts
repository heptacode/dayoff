import { useRef } from 'react';

export function useMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  function initMap() {
    new naver.maps.Map(mapRef.current as HTMLDivElement, {
      center: new naver.maps.LatLng(33.3590628, 126.534361),
      zoom: 10,
      scaleControl: false,
    });
  }

  return { mapRef, initMap };
}
