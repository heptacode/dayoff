import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionProps,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TimelineItem } from './TimelineItem';
import type { ICollection } from '@/types';

export function Timeline({
  collections,
  ...props
}: { collections: ICollection[] } & AccordionProps) {
  const [indices, setIndices] = useState<number[]>([]);

  useEffect(() => {
    setIndices([...Array(collections.length).keys()]);
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
            {collection.events.map(event => (
              <TimelineItem event={event} key={event._id} />
            ))}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
