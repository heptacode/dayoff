import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { useMapStore } from '@/stores/mapStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useEffect, useRef } from 'react';

export function useMap() {
  const globalStore = useGlobalStore();
  const mapStore = useMapStore();
  const eventStore = useEventStore();
  const mapRef = useRef<HTMLDivElement>(null);

  async function initMap() {
    const map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
    });
    mapStore.setMap(map);

    const position = globalStore.userLocation ?? (await getCurrentPosition());

    if (!globalStore.userLocation) {
      globalStore.setUserLocation(position);
    }

    const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map.setCenter(location);

    const userPositionMarker = new naver.maps.Marker({
      map,
      position: location,
      icon: {
        content: '<div class="dot-marker"></div>',
      },
    });

    watchPosition((position: GeolocationPosition) => {
      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      userPositionMarker.setPosition(location);
      globalStore.setUserLocation(position);
    });
  }

  useEffect(() => {
    if (mapStore.map) {
      [...mapStore.markers.entries()].forEach(([eventId, marker]) => {
        if (!eventStore.events.has(eventId)) {
          marker.setMap(null);
        }
      });

      [...eventStore.events.values()].forEach(event => {
        const marker = new naver.maps.Marker({
          map: mapStore.map!,
          position: new naver.maps.LatLng(event.lat, event.lng),
          title: event.title,
        });
        mapStore.setMarker(event._id, marker);
      });
    }
  }, [eventStore.events.size]);

  return { mapRef, initMap };
}
