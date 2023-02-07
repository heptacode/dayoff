import { usePlanStore } from '@/stores/planStore';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { IPlan } from '@/types';

export function usePlansQuery() {
  const planStore = usePlanStore();

  const { isLoading, data: plans } = useQuery<IPlan[]>(
    ['plans'],
    async () => (await getRequest<IPlan[]>(`/api/plans`)).data,
    {
      onSuccess(data) {
        planStore.setPlans(data);
      },
    }
  );

  useEffect(() => {
    planStore.setIsLoading(isLoading);
  }, [isLoading]);

  return { plans };
}
