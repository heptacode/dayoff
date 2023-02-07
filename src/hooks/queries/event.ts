import { useCollectionStore } from '@/stores/collectionStore';
import { usePlanStore } from '@/stores/planStore';
import { getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQueries } from '@tanstack/react-query';
import type { IEvent } from '@/types';

export function useEventQuery({
  collectionId,
  onFetchSuccess,
}: {
  collectionId?: string;
  onFetchSuccess?(collectionId: string, data: IEvent[]): void;
}) {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();

  const queryMap: Map<string, number> = new Map();

  const eventQueries = useQueries({
    queries:
      collectionStore.collections?.map((collection, index) => {
        queryMap.set(collection._id, index);

        return {
          queryKey: ['plan.collection', { collectionId: collection._id }],
          queryFn: async () =>
            (
              await getRequest<IEvent[]>(
                `/api/plans/${planStore.planId}/collections/${collection._id}/events`
              )
            ).data,
          enabled: Boolean(collection._id),
          onSuccess(data: IEvent[]) {
            onFetchSuccess?.(collection._id, data);
          },
        };
      }) ?? [],
  });

  function refetchEvent(collectionId: string) {
    if (queryMap.has(collectionId)) {
      eventQueries[queryMap.get(collectionId)!].refetch();
    }
  }

  function refetchEvents() {
    if (eventQueries.length) {
      eventQueries.forEach(eventQuery => eventQuery.refetch());
    }
  }

  const { isLoading: isCreating, mutateAsync: createEvent } = useMutation(
    ({
      collectionId,
      title,
      subtitle,
      lat,
      lng,
      date,
    }: {
      collectionId: string;
      title?: string;
      subtitle?: string;
      lat?: number;
      lng?: number;
      date?: Date;
    }) =>
      postRequest<IEvent>(`/api/plans/${planStore.planId}/collections/${collectionId}/events`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(lat && { lat }),
        ...(lng && { lng }),
        ...(date && { date }),
      }),
    {
      onSuccess() {
        if (collectionId) {
          refetchEvent(collectionId);
        } else {
          refetchEvents();
        }
      },
    }
  );

  const { isLoading: isUpdating, mutateAsync: updateEvent } = useMutation(
    ({
      eventId,
      title,
      subtitle,
      lat,
      lng,
      date,
      collectionId,
    }: {
      eventId: string;
      title?: string;
      subtitle?: string;
      lat?: number;
      lng?: number;
      date?: string;
      collectionId?: string;
    }) =>
      patchRequest(`/api/plans/${planStore.planId}/collections/${collectionId}/events/${eventId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(lat && { lat }),
        ...(lng && { lng }),
        ...(date && { date }),
        ...(collectionId && { collectionId }),
      }),
    {
      onSuccess() {
        refetchEvents();
      },
    }
  );

  return {
    isLoading: isCreating || isUpdating,
    eventQueries,
    refetchEvent,
    refetchEvents,
    createEvent,
    updateEvent,
  };
}
