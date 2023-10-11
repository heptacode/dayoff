import { useCollectionStore } from '@/stores/collectionStore';
import { Collection } from '@/types';
import { useState } from 'react';
import { useCollectionQuery } from './queries/collections';

export function useCollectionEdit() {
  const collectionStore = useCollectionStore();

  const { updateCollection, deleteCollection } = useCollectionQuery({});

  const [collections, setCollections] = useState<Record<string, Collection>>({});

  function handleTitleInput(collectionId: string, value: string) {
    setCollections({
      ...collections,
      [collectionId]: {
        ...collections[collectionId],
        title: value,
      },
    });
  }

  function handleTitleSave(collectionId: string, value: string) {
    if (collections[collectionId].title !== collectionStore.collections[collectionId].title) {
      collectionStore.setCollectionTitle(collectionId, value);
      updateCollection({ collectionId, title: value });
    }
  }

  function handleColorChange(collectionId: string, value: string) {
    if (collections[collectionId]?.color !== collectionStore.collections[collectionId].color) {
      collectionStore.setCollectionColor(collectionId, value);
      updateCollection({ collectionId, color: value });
    }
  }

  async function handleCollectionDelete(collectionId: string) {
    if (confirm('컬렉션과 컬렉션에 포함된 모든 이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      await deleteCollection(collectionId);
      collectionStore.setCollectionId(null);
    }
  }

  return {
    handleTitleInput,
    handleTitleSave,
    handleColorChange,
    handleCollectionDelete,
  };
}
