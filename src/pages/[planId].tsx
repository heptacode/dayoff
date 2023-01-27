import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { EventProvider } from '@/contexts/EventContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { MapProvider } from '@/contexts/MapContext';
import { Icon, IconButton } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

export default function Plan() {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();

  return (
    <MapProvider>
      <EventProvider>
        {!isSidebarOpen ? (
          <IconButton
            aria-label="Open Sidebar"
            icon={<Icon as={MdMenu} boxSize="5" />}
            position="absolute"
            top="8px"
            left="8px"
            zIndex="1"
            onClick={() => setIsSidebarOpen(true)}
          />
        ) : null}
        <Map />
        <Sidebar />
      </EventProvider>
    </MapProvider>
  );
}
