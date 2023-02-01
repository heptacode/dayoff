import { patchRequest } from '@heptacode/http-request';
import { useMutation } from '@tanstack/react-query';

export function useEventQuery({ planId }: { planId: string }) {
  const { isLoading: isUpdating, mutateAsync: updatePlan } = useMutation(
    ({ title, subtitle }: { title?: string; subtitle?: string }) =>
      patchRequest(`/api/events/${planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  return { isUpdating, updatePlan };
}
