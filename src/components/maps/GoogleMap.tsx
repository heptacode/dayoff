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
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GCP_KEY}&v=weekly`}
        defer
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Flex ref={mapRef} w="full" h="full" justifyContent="center" alignItems="center" />
    </>
  );
}
