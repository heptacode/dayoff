import { Center, CircularProgress, Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdMenu } from 'react-icons/md';
import { useCollectionStore } from '@/features/collections/useCollectionStore';
import { Sidebar } from '@/features/global/Sidebar';
import { useGlobalStore } from '@/features/global/useGlobalStore';
import { GoogleMap } from '@/features/maps/GoogleMap';
import { NaverMap } from '@/features/maps/NaverMap';
import { EventEditModal } from '@/features/modals/EventEditModal';
import { ProjectEditModal } from '@/features/modals/ProjectEditModal';
import { useProjectQuery } from '@/features/projects/useProjectQuery';
import { useProjectStore } from '@/features/projects/useProjectStore';

export default function Project() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const projectStore = useProjectStore();
  const collecionStore = useCollectionStore();

  useProjectQuery({
    onFetchError() {
      router.replace('/');
    },
    onFetchSuccess(data) {
      projectStore.setTitle(data.title);
      projectStore.setSubtitle(data.subtitle);
      projectStore.setMapType(data.mapType);
      projectStore.setIsLoading(false);
    },
  });

  function renderMap() {
    switch (projectStore.mapType) {
      case 'naver':
        return <NaverMap />;
      case 'google':
        return <GoogleMap />;
      default:
        return (
          <Center h="full">
            <CircularProgress isIndeterminate />
          </Center>
        );
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (router.query.projectId?.length === 24) {
        projectStore.setProjectId(String(router.query.projectId));
      } else {
        router.replace('/');
      }
    }

    return () => {
      projectStore.setProjectId(null);
      collecionStore.setCollectionId(null);
    };
  }, [router.query.projectId]);

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
          colorScheme="blue"
          onClick={() => globalStore.setIsSidebarOpen(true)}
        />
      ) : null}
      {renderMap()}
      <Sidebar />
      <ProjectEditModal
        isOpen={globalStore.isProjectEditModalOpen}
        onClose={() => globalStore.setIsProjectEditModalOpen(false)}
      />
      <EventEditModal
        isOpen={globalStore.isEventEditModalOpen}
        onClose={() => globalStore.setIsEventEditModalOpen(false)}
      />
    </>
  );
}
