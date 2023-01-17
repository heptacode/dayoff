import { useSearch } from '@/hooks/queries/search';
import { KeywordSearchDocument } from '@/types';
import { useDebounceValue } from '@/utils/debounce';
import { Button, Card, Input } from '@chakra-ui/react';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

export function SearchInput({
  handlePlaceSelect,
  ...props
}: {
  handlePlaceSelect: (place: KeywordSearchDocument) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const debouncedSearchQuery = useDebounceValue(searchValue, 300);
  const { data: places, refetch: refetchSearch } = useSearch({
    query: debouncedSearchQuery,
  });

  async function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    refetchSearch();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!places) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHoveredIndex(hoveredIndex + 1);
      if (hoveredIndex + 1 >= places.length) {
        setHoveredIndex(0);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHoveredIndex(hoveredIndex - 1);
      if (hoveredIndex <= 0) {
        setHoveredIndex(places.length - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handlePlaceSelect(places[hoveredIndex]);
    } else {
      setHoveredIndex(0);
    }
  }

  return (
    <div {...props}>
      <form onSubmit={handleSearchFormSubmit}>
        <Input
          type="search"
          placeholder="장소 검색"
          value={searchValue}
          onChange={(event: { target: any }) => setSearchValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>

      {places?.length ? (
        <Card paddingY="2">
          {places.map((place, index) => (
            <Button
              flexDirection="column"
              alignItems="flex-start"
              fontWeight="initial"
              borderRadius={0}
              paddingY={6}
              variant={hoveredIndex === index ? 'solid' : 'ghost'}
              key={index}
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
