import { Loading } from '@/components/interfaces/Loading';
import { useMapContext } from '@/contexts/MapContext';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { waitForGeocoder } from '@/utils/waitForGeocoder';
import Script from 'next/script';
import { useRef } from 'react';
import { DotMarker } from './DotMarker';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();

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
    } catch (error) {
      /* empty */
    }

    await waitForGeocoder();

    new naver.maps.Marker({
      map: map,
      position: naver.maps.TransCoord.fromTM128ToLatLng(new naver.maps.Point(263795, 85782)),
    });
  }

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_API_KEY_ID}&submodules=geocoder`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <div ref={mapRef} className="w-full h-screen">
        <Loading />
      </div>
    </>
  );
}
