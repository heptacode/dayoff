import { useEvent } from '@/hooks/event';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Progress,
  Select,
  Stack,
  StackDivider,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MdDeleteForever } from 'react-icons/md';

export function EventEditModal(props: Partial<ModalProps>) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });
  const {
    events,
    handleTitleInput,
    handleTitleSave,
    handleDescriptionResize,
    handleDescriptionInput,
    handleDescriptionSave,
    handleDateInput,
    handleDateSave,
    handleEventMove,
    handleEventDelete,
  } = useEvent({ onClose });

  if (!eventStore.selectedEventId) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {eventStore.isLoading ? <Progress size="xs" isIndeterminate /> : <Box h="1" />}
        <ModalHeader>이벤트 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl>
              <FormLabel>이벤트 제목</FormLabel>
              <Input
                placeholder="제목 입력"
                value={events[eventStore.selectedEventId]?.title}
                isDisabled={eventStore.isLoading}
                onChange={e => handleTitleInput(eventStore.selectedEventId!, e.target.value)}
                onBlur={e => handleTitleSave(eventStore.selectedEventId!, e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>이벤트 설명</FormLabel>
              <Textarea
                placeholder="설명 입력"
                value={events[eventStore.selectedEventId]?.description}
                isDisabled={eventStore.isLoading}
                onFocus={e => handleDescriptionResize(e)}
                onChange={e => {
                  handleDescriptionResize(e);
                  handleDescriptionInput(eventStore.selectedEventId!, e.target.value);
                }}
                onBlur={e => handleDescriptionSave(eventStore.selectedEventId!, e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>이벤트 날짜</FormLabel>
              <Input
                type="datetime-local"
                value={dayjs(events[eventStore.selectedEventId]?.date).format('YYYY-MM-DDTHH:mm')}
                onChange={e =>
                  handleDateInput(
                    eventStore.selectedEventId!,
                    new Date(e.target.value).toISOString()
                  )
                }
                onBlur={e => handleDateSave(eventStore.selectedEventId!, e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>컬렉션 이동</FormLabel>
              <Select
                placeholder="컬렉션 선택"
                isDisabled={eventStore.isLoading}
                onChange={e =>
                  handleEventMove(
                    eventStore.selectedEventId!,
                    (e.target as HTMLSelectElement).value
                  )
                }
              >
                {collectionStore.getCollections().map(collection => (
                  <option
                    key={collection._id}
                    value={collection._id}
                    disabled={
                      String(events[eventStore.selectedEventId!]?.collectionId) === collection._id
                    }
                  >
                    {collection.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Button
                colorScheme="red"
                disabled={eventStore.isLoading}
                onClick={() =>
                  handleEventDelete(
                    String(events[eventStore.selectedEventId!].collectionId),
                    eventStore.selectedEventId!
                  )
                }
              >
                <Icon as={MdDeleteForever} boxSize="5" />
                삭제
              </Button>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
