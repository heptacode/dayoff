import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useProjectStore } from '@/stores/projectStore';
import { deleteRequest, getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import type { IEvent } from '@/types';

export function useEventQuery() {
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const queryMap: Map<string, number> = new Map();

  const eventQueries = useQueries({
    queries: collectionStore.selectedCollectionIds.map((collectionId: string, index) => {
      queryMap.set(collectionId, index);

      return {
        queryKey: ['project.collection.events', collectionId],
        queryFn: async () =>
          (
            await getRequest<IEvent[]>(
              `/api/projects/${projectStore.projectId}/collections/${collectionId}/events`
            )
          ).data,
        enabled: Boolean(projectStore.projectId) && Boolean(collectionId),
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
    async ({
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
    }) => {
      await postRequest<IEvent>(
        `/api/projects/${projectStore.projectId}/collections/${collectionId}/events`,
        {
          ...(title && { title }),
          ...(description && { description }),
          ...(lat && { lat }),
          ...(lng && { lng }),
          ...(date && { date }),
        }
      );
      if (collectionId) {
        refetchEvent(collectionId);
      } else {
        refetchEvents();
      }
    }
  );

  const { isLoading: isUpdating, mutateAsync: updateEvent } = useMutation(
    async ({
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
    }) => {
      await patchRequest(
        `/api/projects/${projectStore.projectId}/collections/${collectionId}/events/${eventId}`,
        {
          ...(title && { title }),
          ...(description && { description }),
          ...(lat && { lat }),
          ...(lng && { lng }),
          ...(date && { date }),
          ...(collectionId && { collectionId }),
        }
      );
      refetchEvents();
    }
  );

  const { isLoading: isDeleting, mutateAsync: deleteEvent } = useMutation(
    async ({ collectionId, eventId }: { collectionId: string; eventId: string }) => {
      await deleteRequest(
        `/api/projects/${projectStore.projectId}/collections/${collectionId}/events/${eventId}`
      );
      if (collectionId) {
        refetchEvent(collectionId);
      } else {
        eventStore.clearEvents();
        refetchEvents();
      }
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
