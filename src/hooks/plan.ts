import { usePlanStore } from '@/stores/planStore';
import { debounce } from '@/utils/debounce';
import { useCallback } from 'react';
import { useEventQuery } from './queries/event';
import { usePlanQuery } from './queries/plan';
import type { KeywordSearchDocument } from '@/types';

export function usePlan({ planId }: { planId: string }) {
  const planStore = usePlanStore();
  const { updatePlan, isLoading } = usePlanQuery({ planId });
  const { createEvent } = useEventQuery({ planId, collectionId: planStore.collectionId });

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
    createEvent({
      title: place.place_name,
      subtitle: place.road_address_name,
      lat: place.y,
      lng: place.x,
    });
  }

  return {
    isLoading: planStore.isLoading || isLoading,
    handleTitleInput,
    handleSubtitleInput,
    handlePlaceSelect,
  };
}
