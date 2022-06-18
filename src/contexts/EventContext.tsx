import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface EventState {
  isCreateEventPanelOpen: boolean;
  setIsCreateEventPanelOpen: Dispatch<SetStateAction<boolean>>;
}

export const EventContext = createContext<EventState>({} as EventState);

export function EventProvider({ children }: any) {
  const [isCreateEventPanelOpen, setIsCreateEventPanelOpen] = useState<boolean>(false);

  return (
    <EventContext.Provider value={{ isCreateEventPanelOpen, setIsCreateEventPanelOpen }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
