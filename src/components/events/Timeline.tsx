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
import { useEffect, useState } from 'react';
import { TimelineItem } from './TimelineItem';
import type { ICollection, IEvent } from '@/types';

export function Timeline({
  collections,
  events,
  ...props
}: { collections: ICollection[]; events: IEvent[] } & AccordionProps) {
  const eventStore = useEventStore();
  const [indices, setIndices] = useState<number[]>([]);

  useEffect(() => {
    setIndices([...Array(collections?.length).keys()]);
  }, [collections]);

  return (
    <Accordion
      allowMultiple
      index={indices}
      onChange={(idx: number[]) => setIndices(idx)}
      {...props}
    >
      {collections.map(collection => (
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
            {events
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(event =>
                String(event.collectionId) === collection._id ? (
                  <TimelineItem event={event} key={event._id} />
                ) : null
              )}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
