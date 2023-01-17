import { Timeline } from '@/components/events/Timeline';
import { SearchInput } from '@/components/interfaces/inputs/SearchInput';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export function Sidebar() {
  const { isOpen, onClose } = useDisclosure({ isOpen: true });

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      trapFocus={false}
      variant="transparent"
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Editable defaultValue="Dayoff Title">
            <EditablePreview />
            <EditableInput onInput={console.log} />
          </Editable>
          <Text fontSize="sm" fontWeight="initial">
            이벤트 n개
          </Text>
        </DrawerHeader>

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
      </DrawerContent>
    </Drawer>
  );
}
