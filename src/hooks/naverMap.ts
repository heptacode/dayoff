import { colors } from '@/contants';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { getCurrentPosition, watchPosition } from '@/utils/geolocation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useNaverMap() {
  const globalStore = useGlobalStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<Map<string, naver.maps.Marker>>(new Map());
  const setMarker = useCallback((eventId: string, value: naver.maps.Marker) => {
    setMarkers(new Map(markers.set(eventId, value)));
  }, []);
  const [polylines, setPolylines] = useState<naver.maps.Polyline[]>([]);

  async function initMap() {
    if (!naver.maps) {
      return;
    }

    const map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
    });

    setMap(map);

    const position = globalStore.userLocation?.coords?.latitude
      ? globalStore.userLocation
      : (await getCurrentPosition()) ?? {
          coords: {
            latitude: 33.3846,
            longitude: 126.5535,
          },
        };

    if (!globalStore.userLocation?.coords?.latitude) {
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
      if (!naver.maps) {
        return;
      }

      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      userPositionMarker.setPosition(location);
      globalStore.setUserLocation(position);
    });
  }

  useEffect(() => {
    if (
      map &&
      collectionStore.selectedCollectionIds.length &&
      Object.keys(eventStore.events).length
    ) {
      let bounds: naver.maps.LatLngBounds | null = null;
      eventStore.getActiveEvents().forEach(event => {
        if (bounds) {
          bounds.extend(new naver.maps.LatLng(event.lat, event.lng));
        } else {
          bounds = new naver.maps.LatLngBounds(
            new naver.maps.LatLng(event.lat, event.lng),
            new naver.maps.LatLng(event.lat, event.lng)
          );
        }
      });

      if (bounds) {
        map.fitBounds(bounds);
      }
    }
  }, [map, collectionStore.selectedCollectionIds, eventStore.events]);

  useEffect(() => {
    if (map) {
      markers.forEach(marker => marker.setMap(null));

      eventStore.getActiveEvents().forEach(event => {
        const index = eventStore
          .getCollectionEvents(event.collectionId)
          .findIndex(_event => _event._id === event._id);

        const color = collectionStore.collections[String(event.collectionId)]?.color;

        const marker = new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(event.lat, event.lng),
          title: event.title,
          icon: {
            content: `<div class="marker" style="background:${
              color ? colors[color] : '#3182CE'
            }"><span>${index + 1}</span></div>`,
            anchor: new naver.maps.Point(15.5, 35),
          },
        });
        setMarker(event._id, marker);
      });

      polylines.forEach(polyline => polyline.setMap(null));
      setPolylines([]);

      collectionStore.getSelectedCollections().forEach(collection => {
        const polyline = new naver.maps.Polyline({
          map,
          path: eventStore.getCollectionEvents(collection._id),
          strokeColor: collection.color ? colors[collection.color] : '#3182CE',
        });

        setPolylines(polylines.concat(polyline));
      });
    }
  }, [map, collectionStore.updatedAt, eventStore.updatedAt]);

  return { mapRef, initMap };
}
