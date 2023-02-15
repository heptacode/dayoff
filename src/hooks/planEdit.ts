import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { usePlanStore } from '@/stores/planStore';
import { usePlanQuery } from './queries/plan';
import type { MapType } from '@/types';

export function usePlanEdit() {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const { updatePlan, deletePlan } = usePlanQuery({});

  function handleTitleSave() {
    updatePlan({ planId: planStore.planId!, title: planStore.title });
  }

  function handleSubtitleSave() {
    updatePlan({ planId: planStore.planId!, subtitle: planStore.subtitle });
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
    handleTitleSave,
    handleSubtitleSave,
    handleMapTypeChange,
    handlePlanDelete,
  };
}
