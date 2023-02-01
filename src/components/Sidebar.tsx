import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { usePlan } from '@/hooks/plan';
import { useGlobalStore } from '@/stores/globalStore';
import { usePlanStore } from '@/stores/planStore';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export function Sidebar() {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const planStore = usePlanStore();
  const { handleTitleInput, handleSubtitleInput, handlePlaceSelect } = usePlan({
    planId: String(router.query.planId),
  });
  const { isOpen, onClose } = useDisclosure({ isOpen: globalStore.isSidebarOpen });

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
        {planStore.isLoading ? <Progress size="xs" isIndeterminate /> : null}
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
          {/* <Text fontSize="sm" fontWeight="initial">
            이벤트 n개
          </Text> */}
        </DrawerHeader>

        <Box p="5">
          <SearchInput handlePlaceSelect={handlePlaceSelect} />

          <Timeline mt="5" collections={planStore.collections} />
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
