import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface GlobalState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

export function GlobalProvider({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
