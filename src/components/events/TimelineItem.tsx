import { AccordionPanel, Flex, Text } from '@chakra-ui/react';
import type { IEvent } from '@/types';

export function TimelineItem({ event, ...props }: { event: IEvent }) {
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
      ></Flex>

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
    </AccordionPanel>
  );
}
