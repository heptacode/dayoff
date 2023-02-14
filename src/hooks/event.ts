import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { debounce } from '@/utils/debounce';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useEventQuery } from './queries/event';

export function useEvent() {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const { updateEvent } = useEventQuery({
    collectionId: collectionStore.collectionId,
  });

  const debounceTitle = useCallback(
    debounce((eventId: string, title: string) => updateEvent({ eventId, title }), 1000),
    []
  );

  function handleTitleInput(eventId: string, value: string) {
    eventStore.setEvent(eventId, {
      ...eventStore.events.get(eventId)!,
      title: value,
    });
    debounceTitle(eventId, value);
  }

  const debounceDescription = useCallback(
    debounce((eventId: string, description: string) => updateEvent({ eventId, description }), 1000),
    []
  );

  function handleDescriptionInput(eventId: string, value: string) {
    eventStore.setEvent(eventId, {
      ...eventStore.events.get(eventId)!,
      description: value,
    });
    debounceDescription(eventId, value);
  }

  function handleDateInput(eventId: string, value: string) {
    eventStore.setEvent(eventId, {
      ...eventStore.events.get(eventId)!,
      date: value,
    });
  }

  function handleDateSave(eventId: string, value: string) {
    if (eventStore.selectedEvent && !dayjs(eventStore.selectedEvent.date).isSame(dayjs(value))) {
      updateEvent({ eventId, date: value });
    }
  }

  return {
    handleTitleInput,
    handleDescriptionInput,
    handleDateInput,
    handleDateSave,
  };
}
