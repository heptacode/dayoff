import { useSearchQuery } from '@/hooks/queries/search';
import { useDebounceValue } from '@/utils/debounce';
import { Button, Card, Input } from '@chakra-ui/react';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import type { KeywordSearchDocument } from '@/types';

export function SearchInput({
  handlePlaceSelect,
  ...props
}: {
  handlePlaceSelect: (place: KeywordSearchDocument) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const debouncedSearchQuery = useDebounceValue(searchValue, 300);
  const { data: places, refetch: refetchSearch } = useSearchQuery({
    query: debouncedSearchQuery,
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
          handlePlaceSelect(places[hoveredIndex]);
          setSearchValue('');
          setHoveredIndex(0);
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
              <strong>{place.place_name}</strong>
              <small>{place.road_address_name}</small>
            </Button>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
