import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { usePlanStore } from '@/stores/planStore';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import type { IEvent } from '@/types';

export function useEventQuery({ collectionId }: { collectionId?: string | null }) {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const queryMap: Map<string, number> = new Map();

  const eventQueries = useQueries({
    queries: collectionStore.selectedCollectionIds.map((collectionId, index) => {
      queryMap.set(collectionId, index);

      return {
        queryKey: ['plan.collection.events', collectionId],
        queryFn: async () =>
          (
            await getRequest<IEvent[]>(
              `/api/plans/${planStore.planId}/collections/${collectionId}/events`
            )
          ).data,
        enabled: Boolean(planStore.planId) && Boolean(collectionId),
        onSuccess(data: IEvent[]) {
          data.forEach(event => eventStore.setEvent(event._id, event));
        },
      };
    }),
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
      description,
      lat,
      lng,
      date,
    }: {
      collectionId: string;
      title?: string;
      description?: string;
      lat?: number;
      lng?: number;
      date?: Date;
    }) =>
      postRequest<IEvent>(`/api/plans/${planStore.planId}/collections/${collectionId}/events`, {
        ...(title && { title }),
        ...(description && { description }),
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
      description,
      lat,
      lng,
      date,
      collectionId,
    }: {
      eventId: string;
      title?: string;
      description?: string;
      lat?: number;
      lng?: number;
      date?: string;
      collectionId?: string;
    }) =>
      patchRequest(`/api/plans/${planStore.planId}/collections/${collectionId}/events/${eventId}`, {
        ...(title && { title }),
        ...(description && { description }),
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

  const { isLoading: isDeleting, mutateAsync: deleteEvent } = useMutation(
    (eventId: string) =>
      deleteRequest(`/api/plans/${planStore.planId}/collections/${collectionId}/events/${eventId}`),
    {
      onSuccess() {
        if (collectionId) {
          refetchEvent(collectionId);
        } else {
          eventStore.clearEvents();
          refetchEvents();
        }
      },
    }
  );

  const isFetching = useMemo(
    () => eventQueries.findIndex(query => query.isLoading) !== -1,
    [eventQueries]
  );

  useEffect(() => {
    eventStore.setIsLoading(isFetching || isCreating || isUpdating || isDeleting);
  }, [isFetching, isCreating, isUpdating, isDeleting]);

  return {
    eventQueries,
    refetchEvent,
    refetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
