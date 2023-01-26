import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import type { ICollection } from '@/types';

export interface EventState {
  collections: ICollection[];
  setCollections: Dispatch<SetStateAction<ICollection[]>>;
}

export const EventContext = createContext<EventState>({} as EventState);

export function EventProvider({ children }: any) {
  const [collections, setCollections] = useState<ICollection[]>([
    {
      _id: 'qwre',
      title: '첫째날',
      subtitle: 'asf',
      events: [
        {
          _id: 'asf',
          date: new Date(),
          title: '제주 스타벅스',
          subtitle: '커피 타임',
          description:
            '여행 마지막 날에는 스타벅스 제주점. 애월이나 함덕처럼 맑은 에메랄드빛 오션뷰 보며 휴식 취하는 일정',
          lat: 33.23738579332568,
          lng: 126.51530966206293,
        },
        {
          _id: 'asdf',
          date: new Date(),
          title: '제주 스타벅스',
          subtitle: '커피 타임',
          description:
            '여행 마지막 날에는 스타벅스 제주점. 애월이나 함덕처럼 맑은 에메랄드빛 오션뷰 보며 휴식 취하는 일정',
          lat: 33.5430615661113,
          lng: 126.669238934013,
        },
      ],
    },
  ]);

  return (
    <EventContext.Provider value={{ collections, setCollections }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
