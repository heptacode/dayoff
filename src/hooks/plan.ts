import { useCollectionStore } from '@/stores/collectionStore';
import { usePlanStore } from '@/stores/planStore';
import { debounce } from '@/utils/debounce';
import { useCallback } from 'react';
import { useCollectionQuery } from './queries/collections';
import { useEventQuery } from './queries/event';
import { usePlanQuery } from './queries/plan';
import type { Place } from '@/types';

export function usePlan() {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const { updatePlan } = usePlanQuery({});
  useCollectionQuery({
    onFetchSuccess(data) {
      if (data?.length) {
        collectionStore.setCollectionId(data[data.length - 1]._id);
      }
    },
  });
  const { createEvent } = useEventQuery({
    collectionId: collectionStore.collectionId,
  });

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

  function handlePlaceSelect(place: Place) {
    if (
      collectionStore.collectionId &&
      collectionStore.collections.has(collectionStore.collectionId)
    ) {
      createEvent({
        collectionId: collectionStore.collectionId,
        title: place.name,
        description: place.address,
        lat: place.lat,
        lng: place.lng,
      });
    }
  }

  return {
    handleTitleInput,
    handleSubtitleInput,
    handlePlaceSelect,
  };
}
