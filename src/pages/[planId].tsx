import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { useGlobalStore } from '@/stores/globalStore';
import { usePlanStore } from '@/stores/planStore';
import { Icon, IconButton } from '@chakra-ui/react';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdMenu } from 'react-icons/md';
import type { IPlan } from '@/types';

export default function Plan() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const planStore = usePlanStore();

  useQuery<IPlan>(
    ['plan', { planId: router.query.planId }],
    async () => (await getRequest<IPlan>(`/api/plans/${router.query.planId}`)).data,
    {
      enabled: router.isReady && router.query.planId?.length === 24,
      onError() {
        router.replace('/');
      },
      onSuccess(data) {
        planStore.setPlanId(String(router.query.planId));
        planStore.setTitle(data.title);
        planStore.setSubtitle(data.subtitle);
        planStore.setCollections(data.collections);
        planStore.setIsLoading(false);
      },
    }
  );

  useEffect(() => {
    if (router.isReady && router.query.planId?.length !== 24) {
      router.replace('/');
    }
  }, [router]);

  return (
    <>
      {!globalStore.isSidebarOpen ? (
        <IconButton
          aria-label="Open Sidebar"
          icon={<Icon as={MdMenu} boxSize="5" />}
          position="absolute"
          top="8px"
          left="8px"
          zIndex="1"
          onClick={() => globalStore.setIsSidebarOpen(true)}
        />
      ) : null}
      <Map />
      <Sidebar />
    </>
  );
}
