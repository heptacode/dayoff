import { usePlanStore } from '@/stores/planStore';
import { debounce } from '@/utils/debounce';
import { useCallback } from 'react';
import { usePlanQuery } from './queries/plan';
import type { KeywordSearchDocument } from '@/types';

export function usePlan({ planId }: { planId: string }) {
  const planStore = usePlanStore();
  const { updatePlan, isLoading } = usePlanQuery({ planId });

  const debounceTitle = useCallback(
    debounce((title: string) => updatePlan({ title }), 300),
    []
  );

  function handleTitleInput(value: string) {
    planStore.setTitle(value);
    debounceTitle(value);
  }

  const debounceSubtitle = useCallback(
    debounce((subtitle: string) => updatePlan({ subtitle }), 300),
    []
  );

  function handleSubtitleInput(value: string) {
    planStore.setSubtitle(value);
    debounceSubtitle(value);
  }

  function handlePlaceSelect(place: KeywordSearchDocument) {
    console.log(place);
  }

  return {
    isLoading: planStore.isLoading || isLoading,
    handleTitleInput,
    handleSubtitleInput,
    handlePlaceSelect,
  };
}
