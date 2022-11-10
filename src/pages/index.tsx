import { EventListPanel } from '@/components/events/EventListPanel';
// import { Map } from '@/components/maps/Map';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <MapProvider>
      {/* TODO: Uncomment */}
      {/* <Map /> */}
      <EventListPanel />
    </MapProvider>
  );
}
