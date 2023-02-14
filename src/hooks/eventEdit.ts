import { useEventStore } from '@/stores/eventStore';
import dayjs from 'dayjs';
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
      eventStore.events.get(eventStore.selectedEvent!._id)!.title !==
      eventStore.selectedEvent!.title
    ) {
      updateEvent({
        eventId: eventStore.selectedEvent!._id,
        title: eventStore.selectedEvent!.title,
      });
    }
  }

  function handleDescriptionInput(value: string) {
    eventStore.setSelectedEvent({
      ...eventStore.selectedEvent!,
      description: value,
    });
  }

  function handleDescriptionSave() {
    if (
      eventStore.events.get(eventStore.selectedEvent!._id)?.description !==
      eventStore.selectedEvent!.description
    ) {
      updateEvent({
        eventId: eventStore.selectedEvent!._id,
        description: eventStore.selectedEvent!.description,
      });
    }
  }

  function handleDateInput(value: string) {
    eventStore.setSelectedEvent({
      ...eventStore.selectedEvent!,
      date: value,
    });
  }

  function handleDateSave() {
    if (
      !dayjs(eventStore.events.get(eventStore.selectedEvent!._id)?.date).isSame(
        dayjs(eventStore.selectedEvent!.date)
      )
    ) {
      updateEvent({
        eventId: eventStore.selectedEvent!._id,
        date: String(eventStore.selectedEvent!.date),
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
      eventStore.deleteEvent(eventId);
      deleteEvent(eventId);
      onClose();
    }
  }

  return {
    handleTitleInput,
    handleTitleSave,
    handleDescriptionInput,
    handleDescriptionSave,
    handleDateInput,
    handleDateSave,
    handleEventMove,
    handleEventDelete,
  };
}
