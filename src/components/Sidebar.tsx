import { Timeline } from '@/components/events/Timeline';
import { IconButton } from '@/components/interfaces/IconButton';
import { Input } from '@/components/interfaces/inputs/Input';
import { useSearch } from '@/hooks/queries/search';
import { useDebounceValue } from '@/utils/debounce';
import { mdiArrowCollapse } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useState } from 'react';

export function Sidebar() {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchQuery = useDebounceValue(searchValue, 300);
  const { /*data: searchResult,*/ refetch: refetchSearch } = useSearch({
    query: debouncedSearchQuery,
  });

  async function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    refetchSearch();
  }

  return (
    <aside className="fixed top-0 h-screen max-w-[500px] bg-white rounded-tr-lg shadow-lg divide-y divide-gray">
      <div>
        <IconButton className="absolute top-2 right-2 w-6 h-6">
          <Icon path={mdiArrowCollapse} />
        </IconButton>

        <div className="p-5">
          <h1 className="text-xl">Dayoff Title</h1>
          <p className="text-xs">이벤트 n개</p>
        </div>
      </div>

      <div className="p-5">
        <form onSubmit={handleSearchFormSubmit}>
          <Input
            type="search"
            placeholder="장소 검색"
            value={searchValue}
            onChange={(event: { target: any }) => setSearchValue(event.target.value)}
          />
        </form>

        {/* <EventList items={[]} /> */}
        <Timeline
          className="mt-5"
          eventGroups={[
            {
              title: '첫째날',
              subtitle: 'asf',
              date: new Date(),
              events: [
                {
                  date: new Date(),
                  title: '제주 스타벅스',
                  subtitle: '커피 타임',
                  description:
                    '여행 마지막 날에는 스타벅스 제주점. 애월이나 함덕처럼 맑은 에메랄드빛 오션뷰 보며 휴식 취하는 일정',
                  lat: null,
                  lng: null,
                },
                {
                  date: new Date(),
                  title: '제주 스타벅스',
                  subtitle: '커피 타임',
                  description:
                    '여행 마지막 날에는 스타벅스 제주점. 애월이나 함덕처럼 맑은 에메랄드빛 오션뷰 보며 휴식 취하는 일정',
                  lat: null,
                  lng: null,
                },
              ],
            },
          ]}
        />
      </div>
    </aside>
  );
}
