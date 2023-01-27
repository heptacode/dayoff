import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { useEventContext } from '@/contexts/EventContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { ICollection } from '@/types';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  const { collections, setCollections } = useEventContext();
  const { isOpen, onClose } = useDisclosure({ isOpen: isSidebarOpen });

  useQuery<ICollection[]>(
    ['collections'],
    async () => (await getRequest<ICollection[]>('/api/collections')).data,
    { onSuccess: data => setCollections(data) }
  );

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
          <Editable defaultValue="Dayoff Title">
            <EditablePreview />
            <EditableInput onInput={console.log} />
          </Editable>
          <Text fontSize="sm" fontWeight="initial">
            이벤트 n개
          </Text>
        </DrawerHeader>

        <Box p="5">
          <SearchInput handlePlaceSelect={console.log} />

          <Timeline mt="5" collections={collections} />
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
