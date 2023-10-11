import { useEventStore } from '@/stores/eventStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useEventQuery } from './queries/event';
import type { Event } from '@/types';

export function useEvent({ onClose }: { onClose?(): void }) {
  const eventStore = useEventStore();
  const { updateEvent, deleteEvent } = useEventQuery();

  const [events, setEvents] = useState<Record<string, Event>>({});

  useEffect(() => {
    setEvents(eventStore.events);
  }, [eventStore.events]);

  function handleTitleInput(eventId: string, value: string) {
    setEvents({
      ...events,
      [eventId]: {
        ...events[eventId],
        title: value,
      },
    });
  }

  function handleTitleSave(eventId: string, value: string) {
    if (events[eventId].title !== eventStore.events[eventId].title) {
      eventStore.setEventTitle(eventId, value);
      updateEvent({ collectionId: events[eventId].collectionId, eventId, title: value });
    }
  }

  function handleDescriptionInput(eventId: string, value: string) {
    setEvents({
      ...events,
      [eventId]: {
        ...events[eventId],
        description: value,
      },
    });
  }

  function handleDescriptionSave(eventId: string, value: string) {
    if (events[eventId].description !== eventStore.events[eventId].description) {
      eventStore.setEventDescription(eventId, value);
      updateEvent({
        collectionId: events[eventId].collectionId,
        eventId,
        description: value,
      });
    }
  }

  function handleDescriptionResize(
    e: React.ChangeEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLTextAreaElement>
  ) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleDateInput(eventId: string, value: string) {
    setEvents({
      ...events,
      [eventId]: {
        ...events[eventId],
        date: value,
      },
    });
  }

  function handleDateSave(eventId: string, value: string) {
    if (events[eventId].date && !dayjs(eventStore.events[eventId].date).isSame(dayjs(value))) {
      eventStore.setEventDate(eventId, value);
      updateEvent({
        collectionId: events[eventId].collectionId,
        eventId,
        date: value,
      });
    }
  }

  async function handleEventMove(eventId: string, collectionId: string) {
    eventStore.clearEvents();
    await updateEvent({
      eventId,
      collectionId: events[eventId].collectionId,
      newCollectionId: collectionId,
    });
    onClose?.();
  }

  function handleEventDelete(collectionId: string, eventId: string) {
    if (confirm('이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      eventStore.deleteEvent(eventId);
      deleteEvent({
        collectionId,
        eventId,
      });
      onClose?.();
    }
  }

  return {
    events,
    handleTitleInput,
    handleTitleSave,
    handleDescriptionInput,
    handleDescriptionSave,
    handleDescriptionResize,
    handleDateInput,
    handleDateSave,
    handleEventMove,
    handleEventDelete,
  };
}
