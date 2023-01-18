import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { EventProvider } from '@/contexts/EventContext';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <MapProvider>
      <EventProvider>
        <Map />
        <Sidebar />
      </EventProvider>
    </MapProvider>
  );
}
