import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import type { ICollection } from '@/types';

export interface PlanState {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  subtitle: string;
  setSubtitle: Dispatch<SetStateAction<string>>;
  collections: ICollection[];
  setCollections: Dispatch<SetStateAction<ICollection[]>>;
}

export const PlanContext = createContext<PlanState>({} as PlanState);

export function PlanProvider({ children }: any) {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [collections, setCollections] = useState<ICollection[]>([]);

  return (
    <PlanContext.Provider
      value={{ title, setTitle, subtitle, setSubtitle, collections, setCollections }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext() {
  return useContext(PlanContext);
}
