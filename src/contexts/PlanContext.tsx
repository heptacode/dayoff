import { usePlan } from '@/hooks/queries/plan';
import { debounce } from '@/utils/debounce';
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from 'react';
import type { ICollection, IPlan } from '@/types';

export interface PlanState {
  isLoading: boolean;
  isUpdating: boolean;
  plans: IPlan[];
  planId: string;
  title: string;
  subtitle: string;
  collections: ICollection[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPlans: Dispatch<SetStateAction<IPlan[]>>;
  setPlanId: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setSubtitle: Dispatch<SetStateAction<string>>;
  setCollections: Dispatch<SetStateAction<ICollection[]>>;
  handleTitleInput(value: string): void;
  handleSubtitleInput(value: string): void;
}

export const PlanContext = createContext<PlanState>({} as PlanState);

export function PlanProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [planId, setPlanId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [collections, setCollections] = useState<ICollection[]>([]);

  const { updatePlan, isUpdating } = usePlan({ planId });

  const debounceTitle = useCallback(
    debounce((title: string) => updatePlan({ title }), 300),
    []
  );

  function handleTitleInput(value: string) {
    setTitle(value);
    debounceTitle(value);
  }

  const debounceSubtitle = useCallback(
    debounce((subtitle: string) => updatePlan({ subtitle }), 300),
    []
  );

  function handleSubtitleInput(value: string) {
    setSubtitle(value);
    debounceSubtitle(value);
  }

  return (
    <PlanContext.Provider
      value={{
        isLoading,
        isUpdating,
        plans,
        setPlans,
        planId,
        title,
        subtitle,
        collections,
        setIsLoading,
        setPlanId,
        setTitle,
        setSubtitle,
        setCollections,
        handleTitleInput,
        handleSubtitleInput,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext() {
  return useContext(PlanContext);
}
