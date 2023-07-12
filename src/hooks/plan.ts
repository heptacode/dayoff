import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { usePlanStore } from '@/stores/planStore';
import { useEffect, useState } from 'react';
import { useCollectionQuery } from './queries/collections';
import { useEventQuery } from './queries/event';
import { usePlanQuery } from './queries/plan';
import type { MapType, Place } from '@/types';

export function usePlan() {
  const eventStore = useEventStore();
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const { updatePlan, deletePlan } = usePlanQuery({});
  useCollectionQuery({
    onFetchSuccess(data) {
      if (data?.length) {
        collectionStore.setCollectionId(data[data.length - 1]._id);
      }
    },
  });
  const { createEvent } = useEventQuery();
  const [title, setTitle] = useState<string>(planStore.title);
  const [subtitle, setSubtitle] = useState<string>(planStore.subtitle);

  useEffect(() => {
    setTitle(planStore.title);
  }, [planStore.title]);

  useEffect(() => {
    setSubtitle(planStore.subtitle);
  }, [planStore.subtitle]);

  function handleTitleInput(value: string) {
    setTitle(value);
  }

  function handleTitleSave() {
    if (title !== planStore.title) {
      planStore.setTitle(title);
      updatePlan({ planId: planStore.planId!, title });
    }
  }

  function handleSubtitleInput(value: string) {
    setSubtitle(value);
  }

  function handleSubtitleSave() {
    if (subtitle !== planStore.subtitle) {
      planStore.setSubtitle(subtitle);
      updatePlan({ planId: planStore.planId!, subtitle });
    }
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

  function handleMapTypeChange(value: MapType) {
    if (planStore.mapType !== value) {
      planStore.setMapType(value);
      updatePlan({ planId: planStore.planId!, mapType: value });
    }
  }

  async function handlePlanDelete() {
    if (collectionStore.collections.size) {
      alert('계획을 삭제하려면 남아있는 컬렉션이 없어야 합니다.');
      return;
    } else if (confirm('계획이 영구적으로 삭제됩니다. 계속할까요?')) {
      await deletePlan(planStore.planId!);
      collectionStore.clearCollections();
      collectionStore.setCollectionId(null);
      eventStore.clearEvents();
    }
  }

  return {
    title,
    subtitle,
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handlePlaceSelect,
    handleMapTypeChange,
    handlePlanDelete,
  };
}
