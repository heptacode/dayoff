import { useCollectionQuery } from '@/hooks/queries/collections';
import { useCollectionStore } from '@/stores/collectionStore';
import { debounce } from '@/utils/debounce';
import {
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';

export function CollectionEditModal(props: Partial<ModalProps>) {
  const collectionStore = useCollectionStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });

  const { updateCollection } = useCollectionQuery({});

  const debounceTitle = useCallback(
    debounce(
      (collectionId: string, title: string) => updateCollection({ collectionId, title }),
      300
    ),
    []
  );

  function handleTitleInput(collectionId: string, value: string) {
    const collection = collectionStore.collections.get(collectionId)!;
    collection.title = '';
    collectionStore.setCollections(collectionId, collection);
    debounceTitle(collectionId, value);
  }

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>컬렉션 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          {collectionStore.collections?.size ? (
            <Stack spacing="4">
              {[...collectionStore.collections.values()].map(collection => (
                <Card key={collection._id}>
                  <CardBody>
                    <Input
                      value={collection.title}
                      fontWeight="semibold"
                      variant="flushed"
                      onInput={e =>
                        handleTitleInput(collection._id, (e.target as HTMLInputElement).value)
                      }
                    />
                    <Input value={collection.subtitle} variant="flushed" />
                  </CardBody>
                </Card>
              ))}
            </Stack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
