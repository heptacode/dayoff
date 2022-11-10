// import { IslandPanel } from '@/components/IslandPanel';
import { Sidebar } from '@/components/Sidebar';
// import { Map } from '@/components/maps/Map';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <MapProvider>
      {/* TODO: Uncomment */}
      {/* <Map /> */}
      <Sidebar />
      {/* <IslandPanel /> */}
    </MapProvider>
  );
}
