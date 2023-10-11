import { Timeline } from '@/components/events/Timeline';
import { TimelineEdit } from '@/components/events/TimelineEdit';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { useProject } from '@/hooks/project';
import { useCollectionQuery } from '@/hooks/queries/collections';
import { useCollectionStore } from '@/stores/collectionStore';
import { useGlobalStore } from '@/stores/globalStore';
import { useProjectStore } from '@/stores/projectStore';
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  IconButton,
  Progress,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdAdd, MdCheck, MdEdit, MdGridView, MdSettings } from 'react-icons/md';

export function Sidebar() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();
  const {
    title,
    subtitle,
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handlePlaceSelect,
  } = useProject();
  const { isOpen, onClose } = useDisclosure({
    isOpen: globalStore.isSidebarOpen,
    onClose() {
      collectionStore.setIsEditing(false);
    },
  });

  const { createCollection } = useCollectionQuery({});

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      trapFocus={false}
      variant="transparent"
      onClose={onClose}
    >
      {collectionStore.isEditing ? <DrawerOverlay /> : null}
      <DrawerContent>
        <DrawerCloseButton onClick={() => globalStore.setIsSidebarOpen(false)} />
        {projectStore.isLoading || collectionStore.isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box h="1" />
        )}
        <DrawerHeader mt="3" borderBottomWidth="1px">
          <Skeleton mr="20" isLoaded={Boolean(title)}>
            <Editable value={title} variant="flushed">
              <EditablePreview />
              <EditableInput
                onChange={e => handleTitleInput(e.target.value)}
                onBlur={handleTitleSave}
              />
            </Editable>
          </Skeleton>

          <Skeleton my="1" mr="10" isLoaded={Boolean(subtitle)}>
            <Editable value={subtitle} fontSize="sm" fontWeight="normal">
              <EditablePreview />
              <EditableInput
                onChange={e => handleSubtitleInput(e.target.value)}
                onBlur={handleSubtitleSave}
              />
            </Editable>
          </Skeleton>
        </DrawerHeader>

        <Box p="5" overflowY="scroll">
          {Object.keys(collectionStore.collections).length && !collectionStore.isEditing ? (
            <SearchInput handlePlaceSelect={handlePlaceSelect} />
          ) : null}

          {!collectionStore.isEditing ? <Timeline my="5" /> : <TimelineEdit my="3" mb="5" />}

          <HStack justify="center">
            {Object.keys(collectionStore.collections).length < 15 ? (
              <Button onClick={() => createCollection()}>
                <Icon as={MdAdd} mr="1" />
                추가
              </Button>
            ) : null}
            {Object.keys(collectionStore.collections).length ? (
              !collectionStore.isEditing ? (
                <Button onClick={() => collectionStore.setIsEditing(true)}>
                  <Icon as={MdEdit} mr="1" />
                  편집
                </Button>
              ) : (
                <Button colorScheme="blue" onClick={() => collectionStore.setIsEditing(false)}>
                  <Icon as={MdCheck} mr="1" />
                  완료
                </Button>
              )
            ) : null}
          </HStack>
        </Box>

        <Flex flex="1" />

        <DrawerFooter justifyContent="space-between" borderTopWidth="1px">
          <IconButton
            aria-label="홈으로"
            icon={<Icon as={MdGridView} boxSize="5" />}
            onClick={() => router.push('/')}
          />
          <IconButton
            aria-label="설정"
            icon={<Icon as={MdSettings} boxSize="5" />}
            onClick={() => globalStore.setIsProjectEditModalOpen(true)}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
