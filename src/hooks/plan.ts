import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { usePlanStore } from '@/stores/planStore';
import { debounce } from '@/utils/debounce';
import { useCallback } from 'react';
import { useCollectionQuery } from './queries/collections';
import { useEventQuery } from './queries/event';
import { usePlanQuery } from './queries/plan';
import type { KeywordSearchDocument } from '@/types';

export function usePlan({ planId }: { planId?: string }) {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const { updatePlan, isLoading } = usePlanQuery({ planId });
  const { collections } = useCollectionQuery({
    planId,
    onFetchSuccess(data) {
      collectionStore.setCollections(data);
      if (data?.length) {
        collectionStore.setCollectionId(data[0]._id);
      }
      collectionStore.setIsLoading(false);
    },
  });
  const { createEvent } = useEventQuery({
    planId,
    collectionId: collectionStore.collectionId,
    collections,
    onFetchSuccess(collectionId, data) {
      eventStore.setEvents(collectionId, data);
      eventStore.setIsLoading(false);
    },
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
