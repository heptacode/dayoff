import { patchRequest } from '@heptacode/http-request';
import { useMutation } from '@tanstack/react-query';

export function usePlan({ planId }: { planId: string }) {
  const { mutateAsync: updatePlan } = useMutation(
    ({ title, subtitle }: { title?: string; subtitle?: string }) =>
      patchRequest(`/api/plans/${planId}`, {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
      })
  );

  return { updatePlan };
}
