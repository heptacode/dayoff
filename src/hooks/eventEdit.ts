import { useEventStore } from '@/stores/eventStore';
import { useEventQuery } from './queries/event';

export function useEventEdit({ onClose }: { onClose(): void }) {
  const eventStore = useEventStore();

  const { updateEvent, deleteEvent } = useEventQuery({
    collectionId: eventStore.selectedEvent
      ? String(eventStore.selectedEvent.collectionId)
      : undefined,
  });

  function handleTitleInput(value: string) {
    eventStore.setSelectedEvent({
      ...eventStore.selectedEvent!,
      title: value,
    });
  }

  function handleTitleSave() {
    if (
      eventStore.events
        .get(String(eventStore.selectedEvent!.collectionId))!
        .get(eventStore.selectedEvent!._id)?.subtitle === eventStore.selectedEvent!.subtitle
    ) {
      updateEvent({
        eventId: eventStore.selectedEvent!._id,
        title: eventStore.selectedEvent!.title,
      });
    }
  }

  function handleSubtitleInput(value: string) {
    eventStore.setSelectedEvent({
      ...eventStore.selectedEvent!,
      subtitle: value,
    });
  }

  function handleSubtitleSave() {
    if (
      eventStore.events
        .get(String(eventStore.selectedEvent!.collectionId))!
        .get(eventStore.selectedEvent!._id)?.subtitle === eventStore.selectedEvent!.subtitle
    ) {
      updateEvent({
        eventId: eventStore.selectedEvent!._id,
        subtitle: eventStore.selectedEvent!.subtitle,
      });
    }
  }

  async function handleEventMove(collectionId: string) {
    eventStore.clearEvents();
    await updateEvent({
      eventId: eventStore.selectedEvent!._id,
      collectionId,
    });
    onClose();
  }

  function handleEventDelete(eventId: string) {
    if (confirm('이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      deleteEvent(eventId);
      onClose();
    }
  }

  return {
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handleEventMove,
    handleEventDelete,
  };
}
