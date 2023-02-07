import { useEventQuery } from '@/hooks/queries/event';
import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
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

export function EventEditModal(props: Partial<ModalProps>) {
  const collectionStore = useCollectionStore();
  const eventStore = useEventStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });

  const { updateEvent } = useEventQuery({});

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

          {collectionStore.collections.size ? (
            <Card paddingY="2" maxHeight="300" overflowY="auto">
              {[...collectionStore.collections.values()].map(collection => (
                <Button
                  key={collection._id}
                  flexDirection="column"
                  alignItems="flex-start"
                  fontWeight="initial"
                  borderRadius={0}
                  paddingY={6}
                  variant="ghost"
                  isDisabled={
                    eventStore.isLoading ||
                    String(eventStore.selectedEvent?.collectionId) === collection._id
                  }
                  onClick={() => handleEventMove(collection._id)}
                >
                  <strong>{collection.title}</strong>
                </Button>
              ))}
            </Card>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
