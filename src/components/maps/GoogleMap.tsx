import { useGoogleMap } from '@/hooks/googleMap';
import { Flex } from '@chakra-ui/react';
import Script from 'next/script';
import { useEffect } from 'react';

export function GoogleMap() {
  const { mapRef, initMap } = useGoogleMap();

  useEffect(() => {
    try {
      if (google) {
        initMap();
      }
    } catch (error) {
      /* empty */
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GCP_KEY}&callback=c&v=weekly`}
        defer
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Script id="googleMapCallback">{`function c(){}if(window){(window.c = c)}`}</Script>
      <Flex ref={mapRef} w="full" h="full" justifyContent="center" alignItems="center" />
    </>
  );
}
