import { Sidebar } from '@/components/Sidebar';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { NaverMap } from '@/components/maps/NaverMap';
import { CollectionEditModal } from '@/components/modals/CollectionEditModal';
import { EventEditModal } from '@/components/modals/EventEditModal';
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
    onFetchError() {
      router.replace('/');
    },
    onFetchSuccess(data) {
      planStore.setTitle(data.title);
      planStore.setSubtitle(data.subtitle);
      planStore.setMapType(data.mapType);
      planStore.setIsLoading(false);
    },
  });

  function renderMap() {
    switch (planStore.mapType) {
      case 'naver':
        return <NaverMap />;
      case 'google':
        return <GoogleMap />;
      default:
        return null;
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (router.query.planId?.length === 24) {
        planStore.setPlanId(String(router.query.planId));
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <>
      {!globalStore.isSidebarOpen ? (
        <IconButton
          aria-label="사이드바 열기"
          icon={<Icon as={MdMenu} boxSize="5" />}
          position="fixed"
          top="8px"
          left="8px"
          zIndex="1"
          colorScheme="telegram"
          onClick={() => globalStore.setIsSidebarOpen(true)}
        />
      ) : null}
      {renderMap()}
      <Sidebar />
      <CollectionEditModal
        isOpen={globalStore.isCollectionEditModalOpen}
        onClose={() => globalStore.setIsCollectionEditModalOpen(false)}
      />
      <EventEditModal
        isOpen={globalStore.isEventEditModalOpen}
        onClose={() => globalStore.setIsEventEditModalOpen(false)}
      />
    </>
  );
}
