import { useCollectionStore } from '@/stores/collectionStore';
import { useEventStore } from '@/stores/eventStore';
import { useProjectStore } from '@/stores/projectStore';
import { useEffect, useState } from 'react';
import { useCollectionQuery } from './queries/collections';
import { useEventQuery } from './queries/event';
import { useProjectQuery } from './queries/project';
import type { MapType, Place } from '@/types';

export function useProject() {
  const eventStore = useEventStore();
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();
  const { updateProject, deleteProject } = useProjectQuery({});
  useCollectionQuery({
    onFetchSuccess(data) {
      if (data?.length) {
        collectionStore.setCollectionId(data[data.length - 1]._id);
      }
    },
  });
  const { createEvent } = useEventQuery();
  const [title, setTitle] = useState<string>(projectStore.title);
  const [subtitle, setSubtitle] = useState<string>(projectStore.subtitle);

  useEffect(() => {
    setTitle(projectStore.title);
  }, [projectStore.title]);

  useEffect(() => {
    setSubtitle(projectStore.subtitle);
  }, [projectStore.subtitle]);

  function handleTitleInput(value: string) {
    setTitle(value);
  }

  function handleTitleSave() {
    if (title !== projectStore.title) {
      projectStore.setTitle(title);
      updateProject({ projectId: projectStore.projectId!, title });
    }
  }

  function handleSubtitleInput(value: string) {
    setSubtitle(value);
  }

  function handleSubtitleSave() {
    if (subtitle !== projectStore.subtitle) {
      projectStore.setSubtitle(subtitle);
      updateProject({ projectId: projectStore.projectId!, subtitle });
    }
  }

  function handlePlaceSelect(place: Place) {
    if (
      collectionStore.collectionId &&
      Object.hasOwn(collectionStore.collections, collectionStore.collectionId)
    ) {
      createEvent({
        collectionId: collectionStore.collectionId,
        title: place.name,
        description: place.address,
        location: place.location,
      });
    }
  }

  function handleMapTypeChange(value: MapType) {
    if (projectStore.mapType !== value) {
      projectStore.setMapType(value);
      updateProject({ projectId: projectStore.projectId!, mapType: value });
    }
  }

  async function handleProjectDelete() {
    if (Object.keys(collectionStore.collections).length) {
      alert('프로젝트를 삭제하려면 남아있는 컬렉션이 없어야 합니다.');
      return;
    } else if (confirm('프로젝트가 영구적으로 삭제됩니다. 계속할까요?')) {
      await deleteProject(projectStore.projectId!);
      collectionStore.clearCollections();
      collectionStore.setCollectionId(null);
      eventStore.clearEvents();
    }
  }

  return {
    title,
    subtitle,
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handlePlaceSelect,
    handleMapTypeChange,
    handleProjectDelete,
  };
}
