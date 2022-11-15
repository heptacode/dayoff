import { KeywordSearchDocument, KeywordSearchOptions, KeywordSearchResponse } from '@/types';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';

export function useSearch({ query }: { query: string }) {
  return useQuery<KeywordSearchDocument[]>(
    ['get_search_data', query],
    async () => {
      try {
        const options: KeywordSearchOptions = { query };

        const { data, status } = await getRequest<KeywordSearchResponse>('/api/search', options);

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
