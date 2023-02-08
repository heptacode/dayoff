import { useCollectionQuery } from '@/hooks/queries/collections';
import { useCollectionStore } from '@/stores/collectionStore';
import { debounce } from '@/utils/debounce';
import {
  Flex,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { MdDeleteForever } from 'react-icons/md';

export function CollectionEditModal(props: Partial<ModalProps>) {
  const collectionStore = useCollectionStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });

  const { updateCollection, deleteCollection } = useCollectionQuery({});

  const debounceTitle = useCallback(
    debounce(
      (collectionId: string, title: string) => updateCollection({ collectionId, title }),
      500
    ),
    []
  );

  function handleTitleInput(collectionId: string, value: string) {
    collectionStore.setCollections(collectionId, {
      ...collectionStore.collections.get(collectionId)!,
      title: value,
    });
    debounceTitle(collectionId, value);
  }

  function handleCollectionDelete(collectionId: string) {
    if (confirm('컬렉션과 컬렉션에 포함된 모든 이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      deleteCollection(collectionId);
    }
  }

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>컬렉션 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          {collectionStore.collections?.size ? (
            <Stack divider={<StackDivider />} spacing="4">
              {[...collectionStore.collections.values()].map(collection => (
                <Flex key={collection._id}>
                  <Input
                    value={collection.title}
                    fontWeight="semibold"
                    onInput={e =>
                      handleTitleInput(collection._id, (e.target as HTMLInputElement).value)
                    }
                  />
                  <IconButton
                    aria-label={'컬렉션 삭제'}
                    colorScheme="red"
                    icon={<Icon as={MdDeleteForever} boxSize="5" />}
                    variant="outline"
                    disabled={collectionStore.isLoading}
                    onClick={() => handleCollectionDelete(collection._id)}
                  />
                </Flex>
              ))}
            </Stack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
