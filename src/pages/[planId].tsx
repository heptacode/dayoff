import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { usePlanQuery } from '@/hooks/queries/plan';
import { useGlobalStore } from '@/stores/globalStore';
import { usePlanStore } from '@/stores/planStore';
import { Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Plan() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const planStore = usePlanStore();
  usePlanQuery({
    planId: String(router.query.planId),
    onPlanError() {
      router.replace('/');
    },
    onPlanSuccess(data) {
      planStore.setPlanId(String(router.query.planId));
      planStore.setTitle(data.title);
      planStore.setSubtitle(data.subtitle);
      planStore.setCollections(data.collections);
      planStore.setCollectionId(data.collections[0]._id);
      planStore.setIsLoading(false);
    },
  });

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
