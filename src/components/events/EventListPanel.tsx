import { EventList } from '@/components/events/EventList';
import { IconButton } from '@/components/interfaces/IconButton';
import { Input } from '@/components/interfaces/inputs/Input';
import { useSearch } from '@/hooks/queries/search';
import { useDebounceValue } from '@/utils/debounce';
import { mdiPlus } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useState } from 'react';

export function EventListPanel() {
  const [isCreateEventPanelOpen, setIsCreateEventPanelOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchQuery = useDebounceValue(searchValue, 300);
  const { data: searchResult, refetch: refetchSearch } = useSearch({ query: debouncedSearchQuery });

  async function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    refetchSearch();
  }

  return (
    <div className="absolute top-6 left-6 min-w-[250px] min-h-[100px] bg-white rounded-xl shadow-lg divide-y divide-gray">
      <div className="p-5">
        <h1 className="text-xl">Event Title</h1>
        <p className="text-xs">이벤트 n개</p>
      </div>

      <EventList items={[]}></EventList>

      {/* 
      <Button>
        <Icon path={mdiChevronDown} size={1} />
      </Button> */}

      <div className="p-5">
        <IconButton onClick={() => setIsCreateEventPanelOpen(!isCreateEventPanelOpen)}>
          <Icon
            path={mdiPlus}
            size={1}
            className={`duration-100 ${isCreateEventPanelOpen ? 'rotate-45' : ''}`}
          />
        </IconButton>

        {isCreateEventPanelOpen && (
          <div>
            <form onSubmit={handleSearchFormSubmit}>
              <Input
                type="search"
                placeholder="장소 검색"
                value={searchValue}
                onChange={(e: { target: { value: string } }) => setSearchValue(e.target.value)}
              />
            </form>

            {/* <IconButton>
              <Icon path={mdiAirplane} size={1} />
            </IconButton>
            <IconButton>
              <Icon path={mdiBed} size={1} />
            </IconButton>
            <IconButton>
              <Icon path={mdiSilverwareForkKnife} size={1} />
            </IconButton> */}
          </div>
        )}
      </div>
    </div>
  );
}
