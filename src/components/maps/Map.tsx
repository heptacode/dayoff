import Loading from '@/components/interfaces/Loading';
import { useMap } from '@/hooks/useMap';
import Script from 'next/script';

export default function Map() {
  const { mapRef, initMap } = useMap();

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_API_KEY_ID}`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <div ref={mapRef} className="w-full h-screen">
        <Loading />
      </div>
    </>
  );
}
