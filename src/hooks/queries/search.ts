import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import type { Place, MapType, SearchOptions, SearchResponse } from '@/types';

export function useSearchQuery({ mapType, query }: { mapType: MapType; query: string }) {
  return useQuery<Place[]>(
    ['get_search_data', query],
    async () => {
      try {
        const options: SearchOptions = { mapType, query };

        const { data, status } = await getRequest<SearchResponse>('/api/search', options);

        switch (status) {
          case 200:
            return data.places ?? [];
          default:
            throw new Error();
        }
      } catch (error) {
        alert('장소 검색 중 오류가 발생했습니다.');
        return [];
      }
    },
    { enabled: Boolean(query.length) }
  );
}
