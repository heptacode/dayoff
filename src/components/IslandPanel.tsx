import { EventList } from '@/components/events/EventList';
import { IconButton } from '@/components/interfaces/IconButton';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { mdiFullscreen, mdiPlus } from '@mdi/js';
import { Icon } from '@mdi/react';

export function IslandPanel() {
  const { isCreateGlobalPanelOpen, setIsCreateGlobalPanelOpen } = useGlobalContext();

  return (
    <div className="absolute top-6 left-6 min-w-[250px] min-h-[100px] bg-white rounded-xl shadow-lg divide-y divide-gray">
      <div>
        <IconButton className="absolute top-2 right-2 w-6 h-6">
          <Icon path={mdiFullscreen} />
        </IconButton>

        <div className="p-5">
          <h1 className="text-xl" contentEditable onChange={() => alert()}>
            Event Title
          </h1>
          <p className="text-xs">이벤트 n개</p>
        </div>
      </div>

      <EventList items={[]}></EventList>

      <div className="p-5">
        <IconButton onClick={() => setIsCreateGlobalPanelOpen(!isCreateGlobalPanelOpen)}>
          <Icon path={mdiPlus} size={1} />
        </IconButton>
      </div>
    </div>
  );
}
