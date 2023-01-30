import { usePlan } from '@/hooks/queries/plan';
import { useDebounceValue } from '@/utils/debounce';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import type { ICollection } from '@/types';

export interface PlanState {
  planId: string;
  setPlanId: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  subtitle: string;
  setSubtitle: Dispatch<SetStateAction<string>>;
  collections: ICollection[];
  setCollections: Dispatch<SetStateAction<ICollection[]>>;
}

export const PlanContext = createContext<PlanState>({} as PlanState);

export function PlanProvider({ children }: any) {
  const [planId, setPlanId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [collections, setCollections] = useState<ICollection[]>([]);

  const { updatePlan } = usePlan({ planId });
  const debouncedTitle = useDebounceValue(title, 300);
  const debouncedSubtitle = useDebounceValue(subtitle, 300);

  useEffect(() => {
    if (planId && debouncedTitle.length) {
      console.log('debouncedTitle', debouncedTitle);
      updatePlan({ title: debouncedTitle });
    }
  }, [debouncedTitle, planId, updatePlan]);

  useEffect(() => {
    if (planId && debouncedSubtitle.length) {
      updatePlan({ title: debouncedSubtitle });
    }
  }, [debouncedSubtitle, planId, updatePlan]);

  return (
    <PlanContext.Provider
      value={{
        planId,
        setPlanId,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        collections,
        setCollections,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext() {
  return useContext(PlanContext);
}
