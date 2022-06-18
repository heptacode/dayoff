export type QueryType = { [key: string]: string };

export interface Place {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

/**
 * 장소 검색 API 응답 결과
 * https://developers.naver.com/docs/serviceapi/search/local/local.md
 */
export interface SearchAPIResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: Place[];
}
