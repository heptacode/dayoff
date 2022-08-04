import { search } from '@/modules/api';
import { useState } from 'react';

export function useEventListPanel() {
  const [isCreateEventPanelOpen, setIsCreateEventPanelOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  async function onSearch(event: React.FormEvent) {
    event.preventDefault();
    console.log(await search(searchValue));
  }

  return {
    isCreateEventPanelOpen,
    setIsCreateEventPanelOpen,
    searchValue,
    setSearchValue,
    onSearch,
  };
}
