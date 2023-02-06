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
import { useEffect, useState } from 'react';
import { TimelineItem } from './TimelineItem';

export function Timeline(props: AccordionProps) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const [indices, setIndices] = useState<number[]>([]);

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
              <small>{collection.subtitle ?? ''}</small>
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
            {eventStore.events
              .get(collection._id)
              ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event, index) =>
                String(event.collectionId) === collection._id ? (
                  <TimelineItem key={event._id} event={event} index={index} />
                ) : null
              )}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
