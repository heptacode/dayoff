import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { MapProvider } from '@/contexts/MapContext';
import { usePlanContext } from '@/contexts/PlanContext';
import { Icon, IconButton } from '@chakra-ui/react';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MdMenu } from 'react-icons/md';
import type { IPlan } from '@/types';

export default function Plan() {
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  const { setPlanId, setTitle, setSubtitle, setCollections } = usePlanContext();

  useQuery<IPlan>(
    ['plan'],
    async () => (await getRequest<IPlan>(`/api/plans/${router.query.planId}`)).data,
    {
      enabled: router.isReady,
      onSuccess: data => {
        setPlanId(String(router.query.planId));
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setCollections(data.collections);
      },
    }
  );

  return (
    <MapProvider>
      {!isSidebarOpen ? (
        <IconButton
          aria-label="Open Sidebar"
          icon={<Icon as={MdMenu} boxSize="5" />}
          position="absolute"
          top="8px"
          left="8px"
          zIndex="1"
          onClick={() => setIsSidebarOpen(true)}
        />
      ) : null}
      <Map />
      <Sidebar />
    </MapProvider>
  );
}
