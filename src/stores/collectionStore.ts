import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICollection } from '@/types';

export interface CollectionState {
  isLoading: boolean;
  collections: ICollection[];
  collectionId: string;
  setIsLoading(value: boolean): void;
  setCollections(value: ICollection[]): void;
  setCollectionId(value: string): void;
}

export const useCollectionStore = create<CollectionState>()(
  devtools(set => ({
    isLoading: true,
    collections: [],
    collectionId: '',
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setCollections(value) {
      set({ collections: value });
    },
    setCollectionId(value) {
      set({ collectionId: value });
    },
  }))
);
