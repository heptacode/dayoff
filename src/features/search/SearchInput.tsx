import { Button, Card, Input } from '@chakra-ui/react';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useProjectStore } from '@/features/projects/useProjectStore';
import { useSearchQuery } from '@/features/search/useSearchQuery';
import { useDebounceValue } from '@/utils/debounce';
import type { Place } from '@/types';

export function SearchInput({
  handlePlaceSelect,
  ...props
}: {
  handlePlaceSelect: (place: Place) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const projectStore = useProjectStore();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const debouncedSearchQuery = useDebounceValue(searchValue, 300);
  const { data: places, refetch: refetchSearch } = useSearchQuery({
    query: debouncedSearchQuery,
    mapType: projectStore.mapType!,
  });

  async function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    refetchSearch();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!places?.length || !searchValue.length) {
      return;
    }

    if (!isComposing && ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
      event.preventDefault();

      switch (event.key) {
        case 'ArrowDown': {
          setHoveredIndex(hoveredIndex + 1);
          if (hoveredIndex + 1 >= places.length) {
            setHoveredIndex(0);
          }
          break;
        }
        case 'ArrowUp': {
          setHoveredIndex(hoveredIndex - 1);
          if (hoveredIndex <= 0) {
            setHoveredIndex(places.length - 1);
          }
          break;
        }
        case 'Enter': {
          if (hoveredIndex !== -1) {
            handlePlaceSelect(places[hoveredIndex]);
            setSearchValue('');
            setHoveredIndex(0);
          }
          return;
        }
        default: {
          setHoveredIndex(0);
        }
      }
    }
  }

  return (
    <div {...props}>
      <form onSubmit={handleSearchFormSubmit}>
        <Input
          type="search"
          placeholder="장소 검색"
          value={searchValue}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onClick={() => setHoveredIndex(-1)}
          onFocus={() => setHoveredIndex(-1)}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>

      {places?.length ? (
        <Card paddingY="2" maxHeight="250" overflowY="auto">
          {places?.map((place, index) => (
            <Button
              key={place.id}
              flexDirection="column"
              alignItems="flex-start"
              fontWeight="initial"
              borderRadius={0}
              paddingY={6}
              variant={hoveredIndex === index ? 'solid' : 'ghost'}
              onClick={() => {
                handlePlaceSelect(place);
                setSearchValue('');
              }}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <strong>{place.name}</strong>
              <small>{place.address}</small>
            </Button>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
