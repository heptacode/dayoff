import { postRequest } from '@/modules/httpRequest';
import { Place } from '@/types';

export async function search(query: string): Promise<Place[]> {
  try {
    return await postRequest<Place[]>('/api/search', { query });
  } catch (error) {
    alert('장소 검색 중 오류가 발생했습니다.');
    return [];
  }
}
