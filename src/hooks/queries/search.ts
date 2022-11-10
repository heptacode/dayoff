import { SearchAPIResponse } from '@/types';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';

export function useSearch({ query }: { query: string }) {
  return useQuery<Omit<SearchAPIResponse, 'meta'>>(
    ['get_search_data', query],
    async () => {
      try {
        const { data: searchResult } = await getRequest<SearchAPIResponse>('/api/search', {
          query,
          lat: 33.3590628,
          lng: 126.534361,
        });
        return searchResult;
      } catch (error) {
        alert('장소 검색 중 오류가 발생했습니다.');
        return {
          meta: undefined,
          ac: undefined,
          place: undefined,
          address: undefined,
        };
      }
    },
    {
      enabled: Boolean(query.length),
      select(data) {
        return {
          ac: data.ac,
          place: data.place,
          address: data.address,
        };
      },
    }
  );
}
