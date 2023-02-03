import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import type { IPlan } from '@/types';

export function usePlansQuery({ onFetchSuccess }: { onFetchSuccess?(data: IPlan[]): void }) {
  const { isLoading, data: plans } = useQuery<IPlan[]>(
    ['plans'],
    async () => (await getRequest<IPlan[]>(`/api/plans`)).data,
    {
      onSuccess(data) {
        onFetchSuccess?.(data);
      },
    }
  );

  return { isLoading, plans };
}
