import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionProps,
  Box,
  Progress,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { TimelineItem } from './TimelineItem';
import type { IEvent } from '@/types';

export function Timeline(props?: AccordionProps) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const [indices, setIndices] = useState<number[]>([]);

  const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    const events = eventStore.events.slice(0);
    // [events[hoverIndex], events[dragIndex]] = [events[dragIndex], events[hoverIndex]];
    [events[dragIndex], events[hoverIndex]] = [events[hoverIndex], events[dragIndex]];
    console.log(events);
    // eventStore.setEvents(events);
  }, []);

  const renderCard = useCallback((event: IEvent, index: number) => {
    return <TimelineItem key={event._id} event={event} index={index} handleMove={handleMove} />;
  }, []);

  useEffect(() => {
    setIndices([...Array(collectionStore.collections?.length).keys()]);
  }, [collectionStore.collections]);

  return (
    <Accordion
      allowMultiple
      index={indices}
      onChange={(idx: number[]) => setIndices(idx)}
      {...props}
    >
      {collectionStore.collections.map(collection => (
        <AccordionItem key={collection._id}>
          {eventStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <h2>{collection.title}</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <Box
            ml="6"
            position="relative"
            as="ol"
            borderLeftWidth={1}
            borderLeftColor="gray.200"
            _dark={{ borderLeftColor: 'gray.600' }}
          >
            {eventStore.events.map((event, index) =>
              String(event.collectionId) === collection._id ? renderCard(event, index) : null
            )}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
