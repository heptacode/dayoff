import { useMap } from '@/hooks/map';
import { Flex } from '@chakra-ui/react';
import Script from 'next/script';
import { useEffect } from 'react';

export function Map() {
  const { mapRef, initMap } = useMap();

  useEffect(() => {
    try {
      if (naver) {
        initMap();
      }
    } catch (error) {
      /* empty */
    }
  }, []);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_KEY_ID}&submodules=geocoder`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Flex ref={mapRef} w="full" h="full" justifyContent="center" alignItems="center" />
    </>
  );
}
