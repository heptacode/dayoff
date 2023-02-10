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
  Skeleton,
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
        ) : (
          <Box h="1" />
        )}
        <DrawerHeader borderBottomWidth="1px">
          <Skeleton mr="20" isLoaded={Boolean(planStore.title)}>
            <Editable value={planStore.title} variant="flushed">
              <EditablePreview />
              <EditableInput onChange={e => handleTitleInput(e.target.value)} />
            </Editable>
          </Skeleton>

          <Skeleton my="1" mr="10" isLoaded={Boolean(planStore.subtitle)}>
            <Editable value={planStore.subtitle} fontSize="sm" fontWeight="normal">
              <EditablePreview />
              <EditableInput onChange={e => handleSubtitleInput(e.target.value)} />
            </Editable>
          </Skeleton>
        </DrawerHeader>

        <Box p="5" overflowY="scroll">
          {collectionStore.collections.size ? (
            <SearchInput handlePlaceSelect={handlePlaceSelect} />
          ) : null}

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
