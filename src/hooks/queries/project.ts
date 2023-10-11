import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { useProjectStore } from '@/stores/projectStore';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { Project } from '@/types';

export function useProjectQuery({
  onFetchError,
  onFetchSuccess,
}: {
  onFetchError?(): void;
  onFetchSuccess?(data: Project): void;
}) {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const {
    isFetching: isProjectsFetching,
    data: projects,
    refetch: refetchProjects,
  } = useQuery(['projects'], async () => (await getRequest<Project[]>(`/api/projects`)).data);

  const { isFetching: isProjectFetching, data: project } = useQuery(
    ['project', projectStore.projectId],
    async () => (await getRequest<Project>(`/api/projects/${projectStore.projectId}`)).data,
    {
      enabled: router.isReady && projectStore.projectId?.length === 24,
      onError() {
        onFetchError?.();
      },
      onSuccess(data) {
        onFetchSuccess?.(data);
      },
    }
  );

  const { isLoading: isCreating, mutateAsync: createProject } = useMutation(
    async () => (await postRequest<Project>(`/api/projects`)).data,
    {
      onSuccess(data) {
        router.push(`/${data._id}`);
        refetchProjects();
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updateProject } = useMutation(
    ({ projectId, title, subtitle, mapType }: { projectId: string } & Partial<Project>) =>
      patchRequest(`/api/projects/${projectId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(mapType && { mapType }),
      })
  );

  const { isLoading: isDeleting, mutateAsync: deleteProject } = useMutation(
    (projectId: string) => deleteRequest(`/api/projects/${projectId}`),
    {
      onSuccess() {
        router.replace('/');
        projectStore.setProjectId(null);
        globalStore.setIsProjectEditModalOpen(false);
        collectionStore.clearCollections();
        collectionStore.setCollectionId(null);
        eventStore.clearEvents();
      },
    }
  );

  useEffect(() => {
    projectStore.setIsLoading(
      isProjectsFetching || isProjectFetching || isCreating || isUpdating || isDeleting
    );
  }, [isProjectsFetching, isProjectFetching, isCreating, isUpdating, isDeleting]);

  return {
    projects,
    project,
    createProject,
    updateProject,
    deleteProject,
  };
}
