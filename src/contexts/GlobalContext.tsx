import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface GlobalState {
  isCreateGlobalPanelOpen: boolean;
  setIsCreateGlobalPanelOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

export function GlobalProvider({ children }: any) {
  const [isCreateGlobalPanelOpen, setIsCreateGlobalPanelOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isCreateGlobalPanelOpen, setIsCreateGlobalPanelOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
