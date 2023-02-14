import { colors } from '@/contants';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useGoogleMap() {
  const globalStore = useGlobalStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<Map<string, google.maps.Marker>>(new Map());
  const setMarker = useCallback((eventId: string, value: google.maps.Marker) => {
    setMarkers(new Map(markers.set(eventId, value)));
  }, []);
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);
  const [isMapCenterChanged, setIsMapCenterChanged] = useState<boolean>(false);

  async function initMap() {
    const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 15,
      zoomControl: false,
    });
    setMap(map);

    // let bounds = new google.maps.LatLngBounds();

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
    if (!isMapCenterChanged && map && eventStore.events.size) {
      setIsMapCenterChanged(true);
      const [event] = eventStore.events.values();
      if (event) {
        map.setCenter(new google.maps.LatLng(event.lat, event.lng));
      }
    }
  }, [eventStore.events.size, map]);

  useEffect(() => {
    if (map) {
      markers.forEach(marker => marker.setMap(null));

      eventStore.getEvents().forEach(event => {
        if (!collectionStore.selectedCollectionIds.includes(String(event.collectionId))) {
          return;
        }

        const index = eventStore
          .getCollectionEvents(event.collectionId)
          .findIndex(_event => _event._id === event._id);

        const color = collectionStore.collections.get(String(event.collectionId))?.color;

        const marker = new google.maps.Marker({
          map,
          position: new google.maps.LatLng(event.lat, event.lng),
          label: {
            color: '#fff',
            text: String(index + 1),
          },
          icon: {
            path: 'M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z',
            fillColor: color ? colors[color] : '#3182CE',
            fillOpacity: 1,
            strokeColor: 'transparent',
            labelOrigin: new google.maps.Point(14, 15),
            anchor: new google.maps.Point(14, 34.5),
          },
        });
        setMarker(event._id, marker);
      });

      polylines.forEach(polyline => polyline.setMap(null));
      setPolylines([]);

      collectionStore.getSelectedCollections().forEach(collection => {
        const polyline = new google.maps.Polyline({
          map,
          path: eventStore.getCollectionEvents(collection._id),
          strokeColor: collection.color ? colors[collection.color] : '#3182CE',
        });

        setPolylines(polylines.concat(polyline));
      });
    }
  }, [collectionStore.updatedAt, eventStore.updatedAt]);

  return { mapRef, initMap };
}
