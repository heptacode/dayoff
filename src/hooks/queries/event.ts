import { getRequest, patchRequest, postRequest } from '@heptacode/http-request';
import { useMutation, useQueries } from '@tanstack/react-query';

export function useEventQuery({
  planId,
  collectionId,
  eventId,
}: {
  planId: string;
  collectionId: string;
  eventId?: string;
}) {
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

  return { isLoading: isCreating || isUpdating, createEvent, updateEvent };
}
