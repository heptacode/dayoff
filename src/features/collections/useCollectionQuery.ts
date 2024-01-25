import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useCollectionStore } from '@/features/collections/useCollectionStore';
import { useProjectStore } from '@/features/projects/useProjectStore';
import { Collection } from '@/types';

export function useCollectionQuery({
  onFetchSuccess,
}: {
  onFetchSuccess?(data: Collection[]): void;
}) {
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();

  const {
    isLoading: isFetching,
    data: collections,
    refetch,
  } = useQuery<Collection[]>(
    ['project.collections', projectStore.projectId],
    async () => (await getRequest(`/api/projects/${projectStore.projectId}/collections`)).data,
    {
      enabled: Boolean(projectStore.projectId),
      onSuccess(data) {
        data.forEach(collection => collectionStore.setCollection(collection._id, collection));

        onFetchSuccess?.(data);
      },
    },
  );

  const { isLoading: isCreating, mutateAsync: createCollection } = useMutation(
    () => postRequest(`/api/projects/${projectStore.projectId}/collections`),
    {
      onSuccess() {
        refetch();
      },
    },
  );

  const { isLoading: isUpdating, mutateAsync: updateCollection } = useMutation(
    ({ collectionId, title, color }: { collectionId: string } & Partial<Collection>) =>
      patchRequest(`/api/projects/${projectStore.projectId}/collections/${collectionId}`, {
        ...(title && { title }),
        ...(color && { color }),
      }),
    {
      onSuccess() {
        refetch();
      },
    },
  );

  const { isLoading: isDeleting, mutateAsync: deleteCollection } = useMutation(
    (collectionId: string) =>
      deleteRequest(`/api/projects/${projectStore.projectId}/collections/${collectionId}`),
    {
      onSuccess() {
        collectionStore.clearCollections();
        refetch();
      },
    },
  );

  useEffect(() => {
    collectionStore.setIsLoading(isFetching || isCreating || isUpdating || isDeleting);
  }, [isFetching, isCreating, isUpdating, isDeleting]);

  return { collections, createCollection, updateCollection, deleteCollection };
}
