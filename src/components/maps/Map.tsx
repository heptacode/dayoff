import { useMapContext } from '@/contexts/MapContext';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { Flex } from '@chakra-ui/react';
import Script from 'next/script';
import { useRef } from 'react';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();

  async function initMap() {
    const map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
    });
    setMap(map);

    const { coords } = await getCurrentPosition();
    const location = new naver.maps.LatLng(coords.latitude, coords.longitude);
    map.setCenter(location);

    new naver.maps.Marker({
      map: map,
      position: location,
      icon: {
        content: '<div class="dot-marker"></div>',
      },
    });
  }

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_API_KEY_ID}&submodules=geocoder`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Flex ref={mapRef} w="full" h="full" justifyContent="center" alignItems="center" />
    </>
  );
}
