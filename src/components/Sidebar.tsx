import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { usePlan } from '@/hooks/plan';
import { useCollectionQuery } from '@/hooks/queries/collections';
import { useCollectionStore } from '@/stores/collectionStore';
import { useGlobalStore } from '@/stores/globalStore';
import { usePlanStore } from '@/stores/planStore';
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Icon,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd, MdEdit } from 'react-icons/md';

export function Sidebar() {
  const globalStore = useGlobalStore();
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const { handleTitleInput, handleSubtitleInput, handlePlaceSelect } = usePlan();
  const { isOpen, onClose } = useDisclosure({ isOpen: globalStore.isSidebarOpen });

  const { createCollection } = useCollectionQuery({});

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      trapFocus={false}
      variant="transparent"
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerCloseButton onClick={() => globalStore.setIsSidebarOpen(false)} />
        {planStore.isLoading || collectionStore.isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : null}
        <DrawerHeader borderBottomWidth="1px">
          <Editable
            value={planStore.title}
            onInput={e => handleTitleInput((e.target as HTMLInputElement).value)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable
            value={planStore.subtitle}
            fontSize="sm"
            fontWeight="normal"
            onInput={e => handleSubtitleInput((e.target as HTMLInputElement).value)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </DrawerHeader>

        <Box p="5" overflowY="scroll">
          <SearchInput handlePlaceSelect={handlePlaceSelect} />

          <Timeline my="5" />

          <HStack justify="center">
            <Button onClick={() => createCollection()}>
              <Icon as={MdAdd} mr="1" />
              추가
            </Button>
            {collectionStore.collections.size ? (
              <Button onClick={() => globalStore.setIsCollectionEditModalOpen(true)}>
                <Icon as={MdEdit} mr="1" />
                편집
              </Button>
            ) : null}
          </HStack>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
