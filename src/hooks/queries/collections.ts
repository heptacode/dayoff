import { usePlanStore } from '@/stores/planStore';
import { ICollection } from '@/types';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';

export function useCollectionQuery({
  onFetchSuccess,
}: {
  onFetchSuccess?(data: ICollection[]): void;
}) {
  const planStore = usePlanStore();

  const { isLoading, data: collections } = useQuery<ICollection[]>(
    ['plan.collections', { planId: planStore.planId }],
    async () => (await getRequest(`/api/plans/${planStore.planId}/collections`)).data,
    {
      enabled: Boolean(planStore.planId),
      onSuccess(data) {
        onFetchSuccess?.(data);
      },
    }
  );

  return { isLoading, collections };
}
