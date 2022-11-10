export type QueryType = { [key: string]: string };

export interface Place {
  type: 'place';
  id: string;
  title: string;
  x: string;
  y: string;
  dist: number;
  totalScore: number;
  sid: string;
  ctg: string;
  cid: string;
  jibunAddress: string;
  roadAddress: string;
  review: {
    count: string;
  };
}

export interface Address {
  type: 'address';
  id: string;
  title: string;
  x: string;
  y: string;
  dist: number;
  totalScore: number;
  pnu: string;
  fullAddress: string;
  shortAddress: string[];
}

export interface SearchAPIResponse {
  meta?: {
    query: string;
  };
  ac?: string[];
  place?: Place[];
  address?: Address[];
}
