import { useMapStore } from '@/stores/mapStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useRef } from 'react';

export function useMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapStore = useMapStore();

  async function initMap() {
    const map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
    });
    mapStore.setMap(map);

    const position = mapStore.userLocation ?? (await getCurrentPosition());

    mapStore.setUserLocation(position);

    const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map.setCenter(location);

    const userPositionMarker = new naver.maps.Marker({
      map: map,
      position: location,
      icon: {
        content: '<div class="dot-marker"></div>',
      },
    });

    watchPosition((position: GeolocationPosition) => {
      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      userPositionMarker.setPosition(location);
      mapStore.setUserLocation(position);
    });
  }

  return { mapRef, initMap };
}
