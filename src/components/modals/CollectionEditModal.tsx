import { useCollectionQuery } from '@/hooks/queries/collections';
import { useCollectionStore } from '@/stores/collectionStore';
import {
  HStack,
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
  Progress,
  Stack,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';

export function CollectionEditModal(props: Partial<ModalProps>) {
  const collectionStore = useCollectionStore();
  const { isOpen, onClose } = useDisclosure({
    ...props,
  });

  const { updateCollection, deleteCollection } = useCollectionQuery({});

  function handleTitleInput(collectionId: string, value: string) {
    collectionStore.setCollections(collectionId, {
      ...collectionStore.collections.get(collectionId)!,
      title: value,
    });
  }

  function handleTitleSave(collectionId: string, value: string) {
    updateCollection({ collectionId, title: value });
  }

  async function handleCollectionDelete(collectionId: string) {
    if (confirm('컬렉션과 컬렉션에 포함된 모든 이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      await deleteCollection(collectionId);
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      {collectionStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
      <ModalContent>
        <ModalHeader>컬렉션 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          {collectionStore.collections?.size ? (
            <Stack divider={<StackDivider />} spacing="4">
              {collectionStore.getCollections().map(collection => (
                <HStack key={collection._id}>
                  <Input
                    value={collection.title}
                    fontWeight="semibold"
                    onChange={e => handleTitleInput(collection._id, e.target.value)}
                    onBlur={e => handleTitleSave(collection._id, e.target.value)}
                  />
                  <IconButton
                    aria-label={'컬렉션 삭제'}
                    colorScheme="red"
                    icon={<Icon as={MdDeleteForever} boxSize="5" />}
                    variant="outline"
                    disabled={collectionStore.isLoading}
                    onClick={() => handleCollectionDelete(collection._id)}
                  />
                </HStack>
              ))}
            </Stack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
