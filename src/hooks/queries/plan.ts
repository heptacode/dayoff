import { getRequest, patchRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { IPlan } from '@/types';

export function usePlanQuery({
  planId,
  onFetchError,
  onFetchSuccess,
}: {
  planId?: string;
  onFetchError?(): void;
  onFetchSuccess?(data: IPlan): void;
}) {
  const router = useRouter();

  const { isLoading: isFetchLoading, data: plan } = useQuery<IPlan>(
    ['plan', { planId }],
    async () => (await getRequest<IPlan>(`/api/plans/${planId}`)).data,
    {
      enabled: router.isReady && Boolean(planId) && planId?.length === 24,
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
      patchRequest(`/api/plans/${planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  return {
    isLoading: isFetchLoading || isUpdating,
    plan,
    updatePlan,
  };
}
