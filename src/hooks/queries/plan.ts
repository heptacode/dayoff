import { usePlanStore } from '@/stores/planStore';
import { getRequest, patchRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { IPlan } from '@/types';

export function usePlanQuery({
  onFetchError,
  onFetchSuccess,
}: {
  onFetchError?(): void;
  onFetchSuccess?(data: IPlan): void;
}) {
  const router = useRouter();
  const planStore = usePlanStore();

  const { isLoading: isFetching, data: plan } = useQuery<IPlan>(
    ['plan', planStore.planId],
    async () => (await getRequest<IPlan>(`/api/plans/${planStore.planId}`)).data,
    {
      enabled: router.isReady && planStore.planId?.length === 24,
      onError() {
        onFetchError?.();
      },
      onSuccess(data) {
        onFetchSuccess?.(data);
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updatePlan } = useMutation(
    ({ title, subtitle }: { title?: string; subtitle?: string }) =>
      patchRequest(`/api/plans/${planStore.planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  useEffect(() => {
    planStore.setIsLoading(isFetching || isUpdating);
  }, [isFetching, isUpdating]);

  return {
    plan,
    updatePlan,
  };
}
