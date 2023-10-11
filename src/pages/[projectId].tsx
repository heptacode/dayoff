import { Sidebar } from '@/components/Sidebar';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { NaverMap } from '@/components/maps/NaverMap';
import { EventEditModal } from '@/components/modals/EventEditModal';
import { ProjectEditModal } from '@/components/modals/ProjectEditModal';
import { useProjectQuery } from '@/hooks/queries/project';
import { useGlobalStore } from '@/stores/globalStore';
import { useProjectStore } from '@/stores/projectStore';
import { Center, CircularProgress, Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Project() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const projectStore = useProjectStore();
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
