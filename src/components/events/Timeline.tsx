import type { Collection } from '@/types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionProps,
  Box,
} from '@chakra-ui/react';
import { TimelineItem } from './TimelineItem';

export function Timeline({
  collections,
  ...props
}: { collections: Collection[] } & AccordionProps) {
  return (
    <Accordion defaultIndex={[...Array(collections.length).keys()]} allowMultiple {...props}>
      {collections.map((collection, index) => (
        <AccordionItem key={index}>
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
            {collection.events.map((event, index) => (
              <TimelineItem event={event} key={index} />
            ))}
          </Box>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
