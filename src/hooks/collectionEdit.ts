import { useCollectionStore } from '@/stores/collectionStore';
import { useCollectionQuery } from './queries/collections';

export function useCollectionEdit({ onClose }: { onClose(): void }) {
  const collectionStore = useCollectionStore();

  const { updateCollection, deleteCollection } = useCollectionQuery({});

  function handleTitleInput(collectionId: string, value: string) {
    collectionStore.setCollections(collectionId, {
      ...collectionStore.collections.get(collectionId)!,
      title: value,
    });
  }

  function handleTitleSave(collectionId: string, value: string) {
    updateCollection({ collectionId, title: value });
  }

  function handleColorChange(collectionId: string, value: string) {
    if (collectionStore.collections.get(collectionId)!.color !== value) {
      collectionStore.setCollections(collectionId, {
        ...collectionStore.collections.get(collectionId)!,
        color: value,
      });
      updateCollection({ collectionId, color: value });
    }
  }

  async function handleCollectionDelete(collectionId: string) {
    if (confirm('컬렉션과 컬렉션에 포함된 모든 이벤트가 영구적으로 삭제됩니다. 계속할까요?')) {
      await deleteCollection(collectionId);
      collectionStore.setCollectionId(null);
      onClose();
    }
  }

  return {
    handleTitleInput,
    handleTitleSave,
    handleColorChange,
    handleCollectionDelete,
  };
}
