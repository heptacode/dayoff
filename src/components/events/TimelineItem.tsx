import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import { AccordionPanel, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { MdReorder } from 'react-icons/md';
import type { IEvent } from '@/types';

export function TimelineItem({ event, index, ...props }: { event: IEvent; index: number }) {
  const globalStore = useGlobalStore();
  const eventStore = useEventStore();

  return (
    <AccordionPanel as="li" ml="3" mb="3" {...props}>
      <Flex
        position="absolute"
        w="6"
        h="6"
        bgColor="blue.200"
        borderRadius="full"
        ring="8"
        ringColor="white"
        left={-3}
        justifyContent="center"
        alignItems="center"
        _dark={{ ringColor: 'gray.900', bgColor: 'blue.800' }}
      >
        <Text fontSize="sm" fontWeight="semibold">
          {index}
        </Text>
      </Flex>

      <Flex position="relative" direction="column">
        <Text fontSize="md" mb="1" fontWeight="semibold">
          {event.title}
        </Text>

        <Text as="time" display="block" fontSize="xs">
          {event.date
            ? new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(
                new Date(event.date)
              )
            : null}
        </Text>

        <Text fontSize="sm">{event.subtitle}</Text>

        <IconButton
          position="absolute"
          top="-2"
          right="-4"
          aria-label="Open Edit Dialog"
          icon={<Icon as={MdReorder} boxSize="4" />}
          borderRadius="full"
          variant="ghost"
          onClick={() => {
            eventStore.setSelectedEvent(event);
            globalStore.setIsEventEditModalOpen(true);
          }}
        />
      </Flex>
    </AccordionPanel>
  );
}
