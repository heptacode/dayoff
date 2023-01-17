// import { Map } from '@/components/maps/Map';
import { Island } from '@/components/Island';
import { MapProvider } from '@/contexts/MapContext';

export default function Home() {
  return (
    <MapProvider>
      {/* <Map /> */}
      <Island />
    </MapProvider>
  );
}
