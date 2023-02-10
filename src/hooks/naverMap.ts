import { colors } from '@/contants';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { useNaverMapStore } from '@/stores/naverMapStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useColorMode } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export function useNaverMap() {
  const colorMode = useColorMode();
  const globalStore = useGlobalStore();
  const mapStore = useNaverMapStore();
  const collectionStore = useCollectionStore();
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
        url: '/geolocation.svg',
        anchor: new naver.maps.Point(4, 24),
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
      mapStore.getMarkers().forEach(marker => marker.setMap(null));

      eventStore.getEvents().forEach(event => {
        const index = eventStore
          .getCollectionEvents(event.collectionId)
          .findIndex(_event => _event._id === event._id);

        const color = collectionStore.collections.get(String(event.collectionId))?.color;

        const marker = new naver.maps.Marker({
          map: mapStore.map!,
          position: new naver.maps.LatLng(event.lat, event.lng),
          title: event.title,
          icon: {
            content: `<div class="marker" style="background:${color ? colors[color] : ''}"><span>${
              index + 1
            }</span></div>`,
            anchor: new naver.maps.Point(15.5, 35),
          },
        });
        mapStore.setMarker(event._id, marker);
      });

      mapStore.polylines.forEach(polyline => polyline.setMap(null));

      collectionStore.getCollections().forEach(collection => {
        const polyline = new naver.maps.Polyline({
          map: mapStore.map!,
          path: eventStore.getCollectionEvents(collection._id),
          strokeColor: collection.color,
        });

        mapStore.setPolylines(mapStore.polylines.concat(polyline));
      });
    }
  }, [collectionStore.updatedAt, eventStore.updatedAt, colorMode]);

  return { mapRef, initMap };
}