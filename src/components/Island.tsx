import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import { Button, Divider, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { mdiArrowCollapse } from '@mdi/js';
import { Icon } from '@mdi/react';

export function Island() {
  return (
    <aside className="fixed top-0 h-screen max-w-[500px] bg-white rounded-tr-lg shadow-lg  ">
      <div>
        <Button position="absolute" top="2" right="2" padding="5px" size="sm" variant="ghost">
          <Icon path={mdiArrowCollapse} />
        </Button>

        <div className="p-5">
          <Editable defaultValue="Dayoff Title">
            <EditablePreview />
            <EditableInput onInput={console.log} />
          </Editable>
          <p className="text-xs">이벤트 n개</p>
        </div>
      </div>

      <Divider />

      <div className="p-5">
        <SearchInput
          handlePlaceSelect={() => {
            return;
          }}
        />

        {/* <EventList items={[]} /> */}
        <Timeline
          className="mt-5"
          eventGroups={
            [] /*[
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
          ]*/
          }
        />
      </div>
    </aside>
  );
}
