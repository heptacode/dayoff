import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { useEventContext } from '@/contexts/EventContext';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export function Sidebar() {
  const { collections } = useEventContext();
  const { isOpen, onClose } = useDisclosure({ isOpen: true });

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      trapFocus={false}
      variant="transparent"
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Editable defaultValue="Dayoff Title">
            <EditablePreview />
            <EditableInput onInput={console.log} />
          </Editable>
          <Text fontSize="sm" fontWeight="initial">
            이벤트 n개
          </Text>
        </DrawerHeader>

        <Box p="5">
          <SearchInput
            handlePlaceSelect={() => {
              return;
            }}
          />

          <Timeline mt="5" collections={collections} />
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
