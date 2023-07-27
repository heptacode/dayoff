import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ColorType, ICollection } from '@/types';

export interface CollectionState {
  isLoading: boolean;
  isEditing: boolean;
  collections: Record<string, ICollection>;
  collectionId: string | null;
  selectedCollectionIds: string[];
  updatedAt: Date;
  getCollections: () => ICollection[];
  getSelectedCollections: () => ICollection[];
  setIsLoading(value: boolean): void;
  setIsEditing(value: boolean): void;
  setCollection(collectionId: string, value: ICollection): void;
  setCollectionTitle(collectionId: string, value: string): void;
  setCollectionColor(collectionId: string, value: ColorType): void;
  clearCollections(): void;
  setCollectionId(value: string | null): void;
  setSelectedCollectionIds(value: string[]): void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    devtools((set, get) => ({
      isLoading: true,
      isEditing: false,
      collections: {},
      collectionId: '',
      selectedCollectionIds: [],
      updatedAt: new Date(),
      getCollections: () => Object.values(get().collections),
      getSelectedCollections: () =>
        Object.values(get().collections).filter(collection =>
          get().selectedCollectionIds.includes(collection._id)
        ),
      setIsLoading(value) {
        set({ isLoading: value });
      },
      setIsEditing(value) {
        set({ isEditing: value });
      },
      setCollection(collectionId, value) {
        set({
          collections: {
            ...get().collections,
            [collectionId]: value,
          },
        });
        set({ updatedAt: new Date() });
      },
      setCollectionTitle(collectionId, value) {
        set({
          collections: {
            ...get().collections,
            [collectionId]: {
              ...get().collections[collectionId],
              title: value,
            },
          },
        });
        set({ updatedAt: new Date() });
      },
      setCollectionColor(collectionId, value) {
        set({
          collections: {
            ...get().collections,
            [collectionId]: {
              ...get().collections[collectionId],
              color: value,
            },
          },
        });
        set({ updatedAt: new Date() });
      },
      clearCollections() {
        set({ collections: {} });
        set({ updatedAt: new Date() });
      },
      setCollectionId(value) {
        set({ collectionId: value });
      },
      setSelectedCollectionIds(value) {
        set({ selectedCollectionIds: value });
        set({ updatedAt: new Date() });
      },
    })),
    {
      name: 'collection',
      partialize: state => ({
        selectedCollectionIds: state.selectedCollectionIds,
      }),
    }
  )
);
