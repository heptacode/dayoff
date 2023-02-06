import { useEventQuery } from '@/hooks/queries/event';
import { useEventStore } from '@/stores/eventStore';
import { ICollection } from '@/types';
import {
  Button,
  Card,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from '@chakra-ui/react';

export function EventEditModal({
  collections,
  ...props
}: { collections: ICollection[] } & Partial<ModalProps>) {
  const eventStore = useEventStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });

  const { isLoading, updateEvent } = useEventQuery({
    onFetchSuccess(collectionId, data) {
      eventStore.setEvents(collectionId, data);
    },
  });

  async function handleEventMove(collectionId: string) {
    await updateEvent({
      eventId: eventStore.selectedEvent!._id,
      collectionId,
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이벤트 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <Heading size="sm">컬렉션 이동</Heading>

          {collections?.length ? (
            <Card paddingY="2" maxHeight="300" overflowY="auto">
              {collections?.map(collection => (
                <Button
                  key={collection._id}
                  flexDirection="column"
                  alignItems="flex-start"
                  fontWeight="initial"
                  borderRadius={0}
                  paddingY={6}
                  variant="ghost"
                  isDisabled={
                    isLoading || String(eventStore.selectedEvent?.collectionId) === collection._id
                  }
                  onClick={() => handleEventMove(collection._id)}
                >
                  <strong>{collection.title}</strong>
                  <small>{collection.subtitle}</small>
                </Button>
              ))}
            </Card>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
