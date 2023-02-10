import { colors } from '@/contants';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionProps,
  Box,
  HStack,
  IconButton,
  Progress,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TimelineItem } from './TimelineItem';

export function Timeline(props: AccordionProps) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const [indices, setIndices] = useState<number[]>([]);

  useEffect(() => {
    setIndices([...Array(collectionStore.collections?.size).keys()]);
  }, [collectionStore.collections.size]);

  return (
    <Accordion
      allowMultiple
      index={indices}
      onChange={(idx: number[]) => setIndices(idx)}
      {...props}
    >
      {[...collectionStore.collections.values()].map(collection => (
        <AccordionItem key={collection._id}>
          {eventStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
          <AccordionButton>
            <HStack flex="1" textAlign="left">
              <IconButton
                aria-label={collection.color.toUpperCase()}
                minWidth="4"
                w="4"
                h="4"
                borderRadius="full"
                bgColor={colors[collection.color]}
              />
              <h2>{collection.title}</h2>
            </HStack>
            <AccordionIcon />
          </AccordionButton>

          <Box
            ml="6"
            position="relative"
            as="ol"
            borderLeftWidth={1}
            borderLeftColor="gray.200"
            listStyleType="none"
            _dark={{ borderLeftColor: 'gray.600' }}
          >
            {eventStore.getCollectionEvents(collection._id).map((event, index) => (
              <TimelineItem key={event._id} collection={collection} event={event} index={index} />
            ))}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
