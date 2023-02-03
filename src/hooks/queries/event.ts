import { ICollection } from '@/types';
import { getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQueries } from '@tanstack/react-query';

export function useEventQuery({
  planId,
  collectionId,
  collections,
  eventId,
}: {
  planId?: string;
  collectionId: string;
  collections?: ICollection[];
  eventId?: string;
}) {
  const eventResults = useQueries({
    queries:
      collections?.map(collection => {
        return {
          queryKey: ['plan.collection', { collectionId: collection._id }],
          queryFn: async () =>
            (await getRequest(`/api/plans/${planId}/collections/${collection._id}/events`)).data,
          enabled: Boolean(collection._id),
        };
      }) ?? [],
  });

  const { isLoading: isCreating, mutateAsync: createEvent } = useMutation(
    ({
      title,
      subtitle,
      lat,
      lng,
      date,
    }: {
      title?: string;
      subtitle?: string;
      lat?: number;
      lng?: number;
      date?: Date;
    }) =>
      postRequest(`/api/plans/${planId}/collections/${collectionId}/events`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(lat && { lat }),
        ...(lng && { lng }),
        ...(date && { date }),
      })
  );

  const { isLoading: isUpdating, mutateAsync: updateEvent } = useMutation(
    ({ title, subtitle }: { title?: string; subtitle?: string }) =>
      patchRequest(`/api/plans/${planId}/collections/${collectionId}/events/${eventId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  return {
    isLoading: isCreating || isUpdating,
    eventResults,
    createEvent,
    updateEvent,
  };
}
