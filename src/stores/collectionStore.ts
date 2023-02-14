import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICollection } from '@/types';

export interface CollectionState {
  isLoading: boolean;
  isEditing: boolean;
  collections: Map<string, ICollection>;
  collectionId: string | null;
  updatedAt: Date;
  getCollections: () => ICollection[];
  setIsLoading(value: boolean): void;
  setIsEditing(value: boolean): void;
  setCollections(collectionId: string, value: ICollection): void;
  clearCollections(): void;
  setCollectionId(value: string | null): void;
}

export const useCollectionStore = create<CollectionState>()(
  devtools((set, get) => ({
    isLoading: true,
    isEditing: false,
    collections: new Map(),
    collectionId: '',
    updatedAt: new Date(),
    getCollections: () => [...get().collections.values()],
    setIsLoading(value) {
      set({ isLoading: value });
    },
    setIsEditing(value) {
      set({ isEditing: value });
    },
    setCollections(collectionId, value) {
      set({ collections: this.collections.set(collectionId, value) });
      set({ updatedAt: new Date() });
    },
    clearCollections() {
      set({ collections: new Map() });
      set({ updatedAt: new Date() });
    },
    setCollectionId(value) {
      set({ collectionId: value });
    },
  }))
);
