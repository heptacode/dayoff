import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { usePlanContext } from '@/contexts/PlanContext';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  useDisclosure,
} from '@chakra-ui/react';

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  const { title, setTitle, subtitle, setSubtitle, collections } = usePlanContext();
  const { isOpen, onClose } = useDisclosure({ isOpen: isSidebarOpen });

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      trapFocus={false}
      variant="transparent"
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerCloseButton onClick={() => setIsSidebarOpen(false)} />
        <DrawerHeader borderBottomWidth="1px">
          <Editable value={title} onInput={e => setTitle((e.target as HTMLInputElement).value)}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable
            value={subtitle}
            fontSize="sm"
            fontWeight="normal"
            onInput={e => setSubtitle((e.target as HTMLInputElement).value)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          {/* <Text fontSize="sm" fontWeight="initial">
            이벤트 n개
          </Text> */}
        </DrawerHeader>

        <Box p="5">
          <SearchInput handlePlaceSelect={console.log} />

          <Timeline mt="5" collections={collections} />
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
