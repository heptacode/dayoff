import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { usePlanStore } from '@/stores/planStore';
import { deleteRequest, getRequest, patchRequest } from '@heptacode/http-request';
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
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

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
    ({ planId, title, subtitle }: { planId: string; title?: string; subtitle?: string }) =>
      patchRequest(`/api/plans/${planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  const { isLoading: isDeleting, mutateAsync: deletePlan } = useMutation(
    (planId: string) => deleteRequest(`/api/plans/${planId}`),
    {
      onSuccess() {
        planStore.setPlanId(null);
        collectionStore.clearCollections();
        collectionStore.setCollectionId(null);
        eventStore.clearEvents();
      },
    }
  );

  useEffect(() => {
    planStore.setIsLoading(isFetching || isUpdating || isDeleting);
  }, [isFetching, isUpdating, isDeleting]);

  return {
    plan,
    updatePlan,
    deletePlan,
  };
}
