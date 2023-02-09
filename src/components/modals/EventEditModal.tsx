import { useEventEdit } from '@/hooks/eventEdit';
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
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handleDateInput,
    handleDateSave,
    handleEventMove,
    handleEventDelete,
  } = useEventEdit({ onClose });

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {eventStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
        <ModalHeader>이벤트 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl>
              <FormLabel>이벤트 제목</FormLabel>
              <Input
                placeholder="제목 입력"
                value={eventStore.selectedEvent?.title}
                isDisabled={eventStore.isLoading}
                onChange={e => handleTitleInput(e.target.value)}
                onBlur={() => handleTitleSave()}
              />
            </FormControl>

            <FormControl>
              <FormLabel>이벤트 부제목</FormLabel>
              <Input
                placeholder="부제목 입력"
                value={eventStore.selectedEvent?.subtitle}
                isDisabled={eventStore.isLoading}
                onChange={e => handleSubtitleInput(e.target.value)}
                onBlur={() => handleSubtitleSave()}
              />
            </FormControl>

            <FormControl>
              <FormLabel>이벤트 날짜</FormLabel>
              <Input
                type="datetime-local"
                value={dayjs(eventStore.selectedEvent?.date).format('YYYY-MM-DDTHH:mm')}
                onChange={e => handleDateInput(new Date(e.target.value).toISOString())}
                onBlur={() => handleDateSave()}
              />
            </FormControl>

            <FormControl>
              <FormLabel>컬렉션 이동</FormLabel>
              <Select
                placeholder="컬렉션 선택"
                isDisabled={eventStore.isLoading}
                onChange={e => handleEventMove((e.target as HTMLSelectElement).value)}
              >
                {collectionStore.getCollections().map(collection => (
                  <option
                    key={collection._id}
                    value={collection._id}
                    disabled={String(eventStore.selectedEvent?.collectionId) === collection._id}
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
                onClick={() => handleEventDelete(eventStore.selectedEvent!._id)}
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
