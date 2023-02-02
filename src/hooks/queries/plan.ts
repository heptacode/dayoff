import { getRequest, patchRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { IPlan } from '@/types';

export function usePlanQuery({
  planId,
  onPlansSuccess,
  onPlanError,
  onPlanSuccess,
}: {
  planId?: string;
  onPlansSuccess?(data: IPlan[]): void;
  onPlanError?(): void;
  onPlanSuccess?(data: IPlan): void;
}) {
  const router = useRouter();

  const { isLoading: isPlansLoading, data: plans } = useQuery<IPlan[]>(
    ['plans'],
    async () => (await getRequest<IPlan[]>(`/api/plans`)).data,
    {
      onSuccess(data) {
        onPlansSuccess?.(data);
      },
    }
  );

  const { isLoading: isPlanLoading, data: plan } = useQuery<IPlan>(
    ['plan', { planId }],
    async () => (await getRequest<IPlan>(`/api/plans/${planId}`)).data,
    {
      enabled: router.isReady && planId?.length === 24,
      onError() {
        onPlanError?.();
      },
      onSuccess(data) {
        onPlanSuccess?.(data);
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
    isLoading: isPlansLoading || isPlanLoading || isUpdating,
    plans,
    plan,
    updatePlan,
  };
}
