import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import type { ICollection } from '@/types';

export interface EventState {
  collections: ICollection[];
  setCollections: Dispatch<SetStateAction<ICollection[]>>;
}

export const EventContext = createContext<EventState>({} as EventState);

export function EventProvider({ children }: any) {
  const [collections, setCollections] = useState<ICollection[]>([]);

  return (
    <EventContext.Provider value={{ collections, setCollections }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
