import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICollection } from '@/types';

export interface CollectionState {
  isLoading: boolean;
  collections: Map<string, ICollection>;
  collectionId: string;
  setIsLoading(value: boolean): void;
  setCollections(collectionId: string, value: ICollection): void;
  clearCollections(): void;
  setCollectionId(value: string): void;
}

export const useCollectionStore = create<CollectionState>()(
  devtools(set => ({
    isLoading: true,
    collections: new Map(),
    collectionId: '',
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setCollections(collectionId, value) {
      set({ collections: this.collections.set(collectionId, value) });
    },
    clearCollections() {
      set({ collections: new Map() });
    },
    setCollectionId(value) {
      set({ collectionId: value });
    },
  }))
);
