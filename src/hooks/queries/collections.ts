import { useCollectionStore } from '@/stores/collectionStore';
import { usePlanStore } from '@/stores/planStore';
import { ICollection } from '@/types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useCollectionQuery({
  onFetchSuccess,
}: {
  onFetchSuccess?(data: ICollection[]): void;
}) {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();

  const {
    isLoading: isFetching,
    data: collections,
    refetch,
  } = useQuery<ICollection[]>(
    ['plan.collections', { planId: planStore.planId }],
    async () => (await getRequest(`/api/plans/${planStore.planId}/collections`)).data,
    {
      enabled: Boolean(planStore.planId),
      onSuccess(data) {
        data.forEach(collection => collectionStore.setCollections(collection._id, collection));

        onFetchSuccess?.(data);
      },
    }
  );

  const { isLoading: isCreating, mutateAsync: createCollection } = useMutation(
    () => postRequest(`/api/plans/${planStore.planId}/collections`),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updateCollection } = useMutation(
    ({ collectionId, title }: { collectionId: string; title?: string }) =>
      patchRequest(`/api/plans/${planStore.planId}/collections/${collectionId}`, {
        ...(title && { title }),
      }),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { isLoading: isDeleting, mutateAsync: deleteCollection } = useMutation(
    (collectionId: string) =>
      deleteRequest(`/api/plans/${planStore.planId}/collections/${collectionId}`),
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
