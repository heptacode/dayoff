import { useEvent } from '@/hooks/event';
import { useEventStore } from '@/stores/eventStore';
import { useGlobalStore } from '@/stores/globalStore';
import {
  AccordionPanel,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MdEdit } from 'react-icons/md';
import type { IEvent } from '@/types';

export function TimelineItem({ event, index, ...props }: { event: IEvent; index: number }) {
  const globalStore = useGlobalStore();
  const eventStore = useEventStore();
  const { handleTitleInput, handleSubtitleInput, handleDateInput, handleDateSave } = useEvent();

  return (
    <AccordionPanel as="li" ml="3" mb="3" {...props}>
      <Flex
        position="absolute"
        left={-3}
        mt={1}
        w="6"
        h="6"
        bgColor="blue.200"
        borderRadius="full"
        ring="8"
        ringColor="white"
        justifyContent="center"
        alignItems="center"
        _dark={{ ringColor: 'gray.900', bgColor: 'blue.800' }}
      >
        <Text fontSize="sm" fontWeight="semibold">
          {index}
        </Text>
      </Flex>

      <Flex position="relative" direction="column">
        <Editable value={event.title} fontWeight="semibold">
          <EditablePreview />
          <EditableInput onChange={e => handleTitleInput(event._id, e.target.value)} />
        </Editable>

        <Text as="time" display="block" fontSize="xs">
          <Input
            type="datetime-local"
            variant="unstyled"
            fontSize="sm"
            value={dayjs(event.date).format('YYYY-MM-DDTHH:mm')}
            onFocus={() => eventStore.setSelectedEvent(event)}
            onChange={e => handleDateInput(event._id, new Date(e.target.value).toISOString())}
            onBlur={e =>
              handleDateSave(
                event._id,
                new Date((e.target as HTMLInputElement).value).toISOString()
              )
            }
          />
        </Text>

        <Editable value={event.subtitle} fontSize="sm">
          <EditablePreview />
          <EditableInput onChange={e => handleSubtitleInput(event._id, e.target.value)} />
        </Editable>

        <IconButton
          position="absolute"
          right="-2"
          aria-label="Open Edit Dialog"
          icon={<Icon as={MdEdit} boxSize="4" />}
          size="sm"
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
