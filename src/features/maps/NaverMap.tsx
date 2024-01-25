import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { useEffect } from 'react';
import { useNaverMap } from '@/features/maps/useNaverMap';
import { useGlobalStore } from '../global/useGlobalStore';

export function NaverMap() {
  const { mapRef, initMap } = useNaverMap();
  const globalStore = useGlobalStore();

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
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_KEY_ID}`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <motion.div
          hidden={!globalStore.isSidebarOpen}
          animate={{
            width: globalStore.isSidebarOpen ? '100%' : 0,
            maxWidth: 'var(--chakra-sizes-xs)',
          }}
        />
        <Flex ref={mapRef} w="100%" h="full" />
      </Flex>
    </>
  );
}
