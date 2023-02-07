import { usePlanStore } from '@/stores/planStore';
import { ICollection } from '@/types';
import { getRequest, patchRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCollectionQuery({
  onFetchSuccess,
}: {
  onFetchSuccess?(data: ICollection[]): void;
}) {
  const planStore = usePlanStore();

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
        onFetchSuccess?.(data);
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

  return { isLoading: isFetching || isUpdating, collections, updateCollection };
}
