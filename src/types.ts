import { model, models, ObjectId, Schema } from 'mongoose';

export type MapType = 'google' | 'naver';

export type ColorType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink'
  | string;

export interface IPlan {
  _id: string;
  title: string;
  subtitle: string;
  mapType: MapType;
  collectionIds: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const planSchema = new Schema<IPlan>(
  {
    title: { type: String, default: '', required: true },
    subtitle: { type: String, default: '', required: true },
    mapType: { type: String, default: 'google', required: true },
    collectionIds: { type: [Schema.Types.ObjectId], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Plan = models.Plan ?? model<IPlan>('Plan', planSchema);

export interface ICollection {
  _id: string;
  planId: ObjectId | string;
  title: string;
  color: ColorType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const collectionSchema = new Schema<ICollection>(
  {
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    title: { type: String, default: '', required: true },
    color: { type: String, default: '', required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Collection = models.Collection ?? model<ICollection>('Collection', collectionSchema);

export interface IEvent {
  _id: string;
  planId: ObjectId;
  collectionId: ObjectId;
  title: string;
  description: string;
  lat: number;
  lng: number;
  date: Date | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const eventSchema = new Schema<IEvent>(
  {
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
    title: { type: String, default: '', required: true },
    description: { type: String, default: '', required: true },
    lat: { type: Number },
    lng: { type: Number },
    date: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Event = models.Event ?? model<IEvent>('Event', eventSchema);

enum SortBy {
  DISTANCE = 'distance',
  ACCURACY = 'accuracy',
}

/**
 * @param query 검색을 원하는 질의어
 * @param rect 사각형의 지정 범위 내 제한 검색 (좌측 X 좌표, 좌측 Y 좌표, 우측 X 좌표, 우측 Y 좌표 형식)
 * @param page 결과 페이지 번호 (최소: 1, 최대: 45, 기본값: 1)
 * @param size 한 페이지에 보여질 문서의 개수 (최소: 1, 최대: 45, 기본값: 15)
 * @param sort 결과 정렬 순서 (distance 또는 accuracy)
 */
export interface KakaoSearchOptions {
  query: string;
  rect?: string;
  page?: number;
  size?: number;
  sort?: SortBy;
}

export interface KakaoSearchSameName {
  region: string[];
  keyword: string;
  selected_region: string;
}

export interface KakaoSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: KakaoSearchSameName;
}

export interface KakaoSearchDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: number;
  y: number;
  place_url: string;
}

export interface KakaoSearchResponse {
  meta?: KakaoSearchMeta;
  documents?: KakaoSearchDocument[];
}

export interface Place {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface SearchOptions extends KakaoSearchOptions {
  query: string;
  mapType: MapType;
}
export interface SearchResponse {
  places?: Place[];
}
