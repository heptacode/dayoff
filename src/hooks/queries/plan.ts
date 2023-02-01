import { usePlanStore } from '@/stores/planStore';
import { getRequest, patchRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { IPlan } from '@/types';

export function usePlanQuery({ planId }: { planId: string }) {
  const planStore = usePlanStore();
  const router = useRouter();

  const { data: plan, isLoading: isFetching } = useQuery<IPlan>(
    ['plan', { planId }],
    async () => (await getRequest<IPlan>(`/api/plans/${router.query.planId}`)).data,
    {
      enabled: router.isReady && router.query.planId?.length === 24,
      onError() {
        router.replace('/');
      },
      onSuccess(data) {
        planStore.setPlanId(planId);
        planStore.setTitle(data.title);
        planStore.setSubtitle(data.subtitle);
        planStore.setCollections(data.collections);
        planStore.setIsLoading(false);
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

  return { isLoading: isFetching || isUpdating, plan, updatePlan };
}
