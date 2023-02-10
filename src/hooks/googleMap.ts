import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { useGoogleMapStore } from '@/stores/googleMapStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export function useGoogleMap() {
  const globalStore = useGlobalStore();
  const mapStore = useGoogleMapStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const colorTheme = useColorModeValue(400, 200);

  async function initMap() {
    const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
    });
    mapStore.setMap(map);

    const position = globalStore.userLocation ?? (await getCurrentPosition());

    if (!globalStore.userLocation) {
      globalStore.setUserLocation(position);
    }

    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map.setCenter(location);

    const userPositionMarker = new google.maps.Marker({
      map,
      position: location,
      icon: {
        url: '/geolocation.svg',
        anchor: new google.maps.Point(4, 24),
      },
    });

    watchPosition((position: GeolocationPosition) => {
      const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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

        const color = collectionStore.collections.get(String(event.collectionId))!.color;

        const marker = new google.maps.Marker({
          map: mapStore.map!,
          position: new google.maps.LatLng(event.lat, event.lng),
          label: {
            color: '#fff',
            text: String(index + 1),
          },
          icon: {
            path: 'M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z',
            fillColor: color ?? '#3182CE',
            fillOpacity: 1,
            strokeColor: 'transparent',
            labelOrigin: new google.maps.Point(14, 15),
            anchor: new google.maps.Point(14, 34.5),
          },
        });
        mapStore.setMarker(event._id, marker);
      });

      mapStore.polylines.forEach(polyline => polyline.setMap(null));

      collectionStore.getCollections().forEach(collection => {
        const polyline = new google.maps.Polyline({
          map: mapStore.map!,
          path: eventStore.getCollectionEvents(collection._id),
          strokeColor: collection.color,
        });

        mapStore.setPolylines(mapStore.polylines.concat(polyline));
      });
    }
  }, [collectionStore.updatedAt, eventStore.updatedAt, colorTheme]);

  return { mapRef, initMap };
}
