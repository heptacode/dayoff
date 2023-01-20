import { useMapContext } from '@/contexts/MapContext';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { waitForGeocoder } from '@/utils/waitForGeocoder';
import { CircularProgress, Flex, Icon } from '@chakra-ui/react';
import Script from 'next/script';
import { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { MdLocationPin } from 'react-icons/md';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();

  async function initMap() {
    const map: naver.maps.Map = new naver.maps.Map(mapRef.current as HTMLDivElement, {
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
        content: renderToString(<Icon as={MdLocationPin} boxSize="6" />),
      },
    });

    await waitForGeocoder();

    // new naver.maps.Marker({
    //   map: map,
    //   position: naver.maps.TransCoord.fromTM128ToLatLng(new naver.maps.Point(263795, 85782)),
    // });
  }

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_API_KEY_ID}&submodules=geocoder`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Flex ref={mapRef} w="full" h="full" justifyContent="center" alignItems="center">
        <CircularProgress isIndeterminate />
      </Flex>
    </>
  );
}
