import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
  StackDivider,
  StackProps,
} from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';
import { colors } from '@/contants';
import { useCollectionEdit } from '@/features/collections/useCollectionEdit';
import { useCollectionStore } from '@/features/collections/useCollectionStore';

export function TimelineEdit(props: StackProps) {
  const collectionStore = useCollectionStore();

  const {
    collections,
    handleTitleInput,
    handleTitleSave,
    handleColorChange,
    handleCollectionDelete,
  } = useCollectionEdit();

  return (
    <Stack {...props}>
      {Object.keys(collectionStore.collections).length ? (
        <Stack divider={<StackDivider />} spacing="4">
          {collectionStore.getCollections().map(collection => (
            <Box key={collection._id}>
              <HStack>
                <Input
                  value={collections[collection._id]?.title}
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

              <ButtonGroup mt="2" size="xs" flexWrap="wrap" isDisabled={collectionStore.isLoading}>
                {Object.entries(colors).map(([colorType, color], index) => (
                  <Button
                    key={index}
                    w="6"
                    h="6"
                    borderRadius="full"
                    title={colorType.toUpperCase()}
                    bgColor={color}
                    color="#fff"
                    _hover={{ bgColor: color, filter: 'brightness(0.8)' }}
                    onClick={() => handleColorChange(collection._id, colorType)}
                  >
                    {collection.color === colorType ? <>&#10003;</> : null}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}
