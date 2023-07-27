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
  Button,
  HStack,
  Progress,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { TimelineItem } from './TimelineItem';

export function Timeline(props: AccordionProps) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();

  const indices = useMemo(
    () =>
      Object.keys(collectionStore.collections).length
        ? collectionStore.selectedCollectionIds.map(collectionId =>
            collectionStore
              .getCollections()
              .findIndex(collection => collection._id === collectionId)
          )
        : [],
    [collectionStore.collections, collectionStore.selectedCollectionIds]
  );

  function handleIndiciesChange(indices: number[]) {
    const collectionIds: string[] = [];
    indices.forEach(index => {
      if (index === -1) {
        return;
      }

      collectionIds.push(collectionStore.getCollections()[index]._id);
    });
    collectionStore.setSelectedCollectionIds(collectionIds);
  }

  return (
    <Accordion
      allowMultiple
      index={indices}
      onChange={(idx: number[]) => handleIndiciesChange(idx)}
      {...props}
    >
      {collectionStore.getCollections().map(collection => (
        <AccordionItem key={collection._id}>
          {eventStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
          <AccordionButton onClick={() => collectionStore.setCollectionId(collection._id)}>
            <HStack flex="1" textAlign="left">
              <Button
                as="div"
                minWidth="4"
                w="4"
                h="4"
                size="xs"
                borderRadius="full"
                bgColor={colors[collection.color]}
                color="#fff"
                _hover={{ bgColor: colors[collection.color], filter: 'brightness(0.8)' }}
              >
                {collectionStore.collectionId === collection._id ? <>&#10003;</> : null}
              </Button>
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
