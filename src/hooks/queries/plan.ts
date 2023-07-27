import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { usePlanStore } from '@/stores/planStore';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { IPlan, MapType } from '@/types';

export function usePlanQuery({
  onFetchError,
  onFetchSuccess,
}: {
  onFetchError?(): void;
  onFetchSuccess?(data: IPlan): void;
}) {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const {
    isFetching: isPlansFetching,
    data: plans,
    refetch: refetchPlans,
  } = useQuery(['plans'], async () => (await getRequest<IPlan[]>(`/api/plans`)).data);

  const { isFetching: isPlanFetching, data: plan } = useQuery(
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

  const { isLoading: isCreating, mutateAsync: createPlan } = useMutation(
    async () => (await postRequest<IPlan>(`/api/plans`)).data,
    {
      onSuccess(data) {
        router.push(`/${data._id}`);
        refetchPlans();
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updatePlan } = useMutation(
    ({
      planId,
      title,
      subtitle,
      mapType,
    }: {
      planId: string;
      title?: string;
      subtitle?: string;
      mapType?: MapType;
    }) =>
      patchRequest(`/api/plans/${planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(mapType && { mapType }),
      })
  );

  const { isLoading: isDeleting, mutateAsync: deletePlan } = useMutation(
    (planId: string) => deleteRequest(`/api/plans/${planId}`),
    {
      onSuccess() {
        router.replace('/');
        planStore.setPlanId(null);
        globalStore.setIsPlanEditModalOpen(false);
        collectionStore.clearCollections();
        collectionStore.setCollectionId(null);
        eventStore.clearEvents();
      },
    }
  );

  useEffect(() => {
    planStore.setIsLoading(
      isPlansFetching || isPlanFetching || isCreating || isUpdating || isDeleting
    );
  }, [isPlansFetching, isPlanFetching, isCreating, isUpdating, isDeleting]);

  return {
    plans,
    plan,
    createPlan,
    updatePlan,
    deletePlan,
  };
}
