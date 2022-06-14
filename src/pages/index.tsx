import Map from '@/components/Map';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <div>
      <MapProvider>
        <Map></Map>
      </MapProvider>
    </div>
  );
}
