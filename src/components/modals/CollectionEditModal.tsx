import { colors } from '@/contants';
import { useCollectionEdit } from '@/hooks/collectionEdit';
import { useCollectionStore } from '@/stores/collectionStore';
import {
  Box,
  Button,
  ButtonGroup,
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
  const { handleTitleInput, handleTitleSave, handleColorChange, handleCollectionDelete } =
    useCollectionEdit({
      onClose,
    });

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {collectionStore.isLoading ? <Progress size="xs" isIndeterminate /> : <Box h="1" />}
        <ModalHeader>컬렉션 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          {collectionStore.collections?.size ? (
            <Stack divider={<StackDivider />} spacing="4">
              {collectionStore.getCollections().map(collection => (
                <Box key={collection._id}>
                  <HStack>
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

                  <ButtonGroup size="xs" flexWrap="wrap" isDisabled={collectionStore.isLoading}>
                    {colors.map((color, index) => (
                      <Button
                        key={index}
                        w="6"
                        h="6"
                        borderRadius="full"
                        title={color.toUpperCase()}
                        {...(colors.includes(color) ? { colorScheme: color } : { bgColor: color })}
                        onClick={() => handleColorChange(collection._id, color)}
                      >
                        {collection.color === color ? <>&#10003;</> : null}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              ))}
            </Stack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
