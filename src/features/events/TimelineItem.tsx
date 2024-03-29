import {
  AccordionPanel,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MdEdit } from 'react-icons/md';
import { colors } from '@/contants';
import { useEvent } from '@/features/events/useEvent';
import { useEventStore } from '@/features/events/useEventStore';
import { useGlobalStore } from '@/features/global/useGlobalStore';
import type { Collection, Event } from '@/types';

export function TimelineItem({
  collection,
  event,
  index,
  ...props
}: {
  collection: Collection;
  event: Event;
  index: number;
}) {
  const globalStore = useGlobalStore();
  const eventStore = useEventStore();
  const {
    events,
    handleTitleInput,
    handleTitleSave,
    handleDescriptionInput,
    handleDescriptionSave,
    handleDescriptionResize,
    handleDateInput,
    handleDateSave,
  } = useEvent({});

  return (
    <AccordionPanel as="li" ml="3" mb="3" {...props}>
      <IconButton
        position="absolute"
        left={-3}
        mt={1}
        minWidth="6"
        w="6"
        h="6"
        aria-label={collection.color.toUpperCase()}
        borderRadius="full"
        bgColor={colors[collection.color]}
      >
        <Text fontSize="sm" fontWeight="semibold" color="#fff">
          {index + 1}
        </Text>
      </IconButton>

      <Flex position="relative" direction="column">
        <Editable value={events[event._id]?.title} fontWeight="semibold">
          <EditablePreview />
          <EditableInput
            onChange={e => handleTitleInput(event._id, e.target.value)}
            onBlur={e => handleTitleSave(event._id, e.target.value)}
          />
        </Editable>

        <Text as="time" display="block" fontSize="xs">
          <Input
            type="datetime-local"
            variant="unstyled"
            fontSize="sm"
            value={dayjs(events[event._id]?.date).format('YYYY-MM-DDTHH:mm')}
            onChange={e => handleDateInput(event._id, new Date(e.target.value).toISOString())}
            onBlur={e =>
              handleDateSave(
                event._id,
                new Date((e.target as HTMLInputElement).value).toISOString(),
              )
            }
          />
        </Text>

        <Editable value={events[event._id]?.description} fontSize="sm">
          <EditablePreview whiteSpace="pre-wrap" />
          <EditableTextarea
            onFocus={e => handleDescriptionResize(e)}
            onChange={e => {
              handleDescriptionResize(e);
              handleDescriptionInput(event._id, e.target.value);
            }}
            onBlur={e => handleDescriptionSave(event._id, e.target.value)}
          />
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
            eventStore.setSelectedEventId(event._id);
            globalStore.setIsEventEditModalOpen(true);
          }}
        />
      </Flex>
    </AccordionPanel>
  );
}
