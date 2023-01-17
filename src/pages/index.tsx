import { Sidebar } from '@/components/Sidebar';
import { Map } from '@/components/maps/Map';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <MapProvider>
      <Map />
      <Sidebar />
    </MapProvider>
  );
}
