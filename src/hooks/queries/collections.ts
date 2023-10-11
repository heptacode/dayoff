import { useCollectionStore } from '@/stores/collectionStore';
import { useProjectStore } from '@/stores/projectStore';
import { ICollection } from '@/types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useCollectionQuery({
  onFetchSuccess,
}: {
  onFetchSuccess?(data: ICollection[]): void;
}) {
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();

  const {
    isLoading: isFetching,
    data: collections,
    refetch,
  } = useQuery<ICollection[]>(
    ['project.collections', projectStore.projectId],
    async () => (await getRequest(`/api/projects/${projectStore.projectId}/collections`)).data,
    {
      enabled: Boolean(projectStore.projectId),
      onSuccess(data) {
        data.forEach(collection => collectionStore.setCollection(collection._id, collection));

        onFetchSuccess?.(data);
      },
    }
  );

  const { isLoading: isCreating, mutateAsync: createCollection } = useMutation(
    () => postRequest(`/api/projects/${projectStore.projectId}/collections`),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updateCollection } = useMutation(
    ({ collectionId, title, color }: { collectionId: string; title?: string; color?: string }) =>
      patchRequest(`/api/projects/${projectStore.projectId}/collections/${collectionId}`, {
        ...(title && { title }),
        ...(color && { color }),
      }),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { isLoading: isDeleting, mutateAsync: deleteCollection } = useMutation(
    (collectionId: string) =>
      deleteRequest(`/api/projects/${projectStore.projectId}/collections/${collectionId}`),
    {
      onSuccess() {
        collectionStore.clearCollections();
        refetch();
      },
    }
  );

  useEffect(() => {
    collectionStore.setIsLoading(isFetching || isCreating || isUpdating || isDeleting);
  }, [isFetching, isCreating, isUpdating, isDeleting]);

  return { collections, createCollection, updateCollection, deleteCollection };
}
