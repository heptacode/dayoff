import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { debounce } from '@/utils/debounce';
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

  function handleTitleInput(collectionId: string, eventId: string, value: string) {
    eventStore.setEvents(collectionId, eventId, {
      ...eventStore.events.get(collectionId)!.get(eventId)!,
      title: value,
    });
    debounceTitle(eventId, value);
  }

  const debounceSubtitle = useCallback(
    debounce((eventId: string, subtitle: string) => updateEvent({ eventId, subtitle }), 1000),
    []
  );

  function handleSubtitleInput(collectionId: string, eventId: string, value: string) {
    eventStore.setEvents(collectionId, eventId, {
      ...eventStore.events.get(collectionId)!.get(eventId)!,
      subtitle: value,
    });
    debounceSubtitle(eventId, value);
  }

  const debounceDate = useCallback(
    debounce((eventId, date: string) => updateEvent({ eventId, date }), 2000),
    []
  );

  function handleDateInput(collectionId: string, eventId: string, value: string) {
    eventStore.setEvents(collectionId, eventId, {
      ...eventStore.events.get(collectionId)!.get(eventId)!,
      date: value,
    });
    debounceDate(eventId, value);
  }

  return {
    handleTitleInput,
    handleSubtitleInput,
    handleDateInput,
  };
}
