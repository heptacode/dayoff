import { ICollection } from '@/types';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';

export function useCollectionQuery({
  planId,
  onFetchSuccess,
}: {
  planId?: string;
  onFetchSuccess?(data: ICollection[]): void;
}) {
  const { isLoading, data: collections } = useQuery<ICollection[]>(
    ['plan.collections', { planId }],
    async () => (await getRequest(`/api/plans/${planId}/collections`)).data,
    {
      enabled: Boolean(planId),
      onSuccess(data) {
        onFetchSuccess?.(data);
      },
    }
  );

  return { isLoading, collections };
}
