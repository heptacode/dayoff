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

export interface Project {
  _id: string;
  title: string;
  subtitle: string;
  mapType: MapType;
  collectionIds: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const projectSchema = new Schema<Project>(
  {
    title: { type: String, default: '', required: true },
    subtitle: { type: String, default: '', required: true },
    mapType: { type: String, default: 'google', required: true },
    collectionIds: { type: [Schema.Types.ObjectId], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
export const ProjectModel = models.Project ?? model<Project>('Project', projectSchema);

export interface Collection {
  _id: string;
  projectId: ObjectId | string;
  title: string;
  color: ColorType;
  eventIds: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const collectionSchema = new Schema<Collection>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, default: '', required: true },
    color: { type: String, default: '', required: true },
    eventIds: { type: [Schema.Types.ObjectId], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
export const CollectionModel =
  models.Collection ?? model<Collection>('Collection', collectionSchema);

export interface Event {
  _id: string;
  projectId: ObjectId | string;
  collectionId: ObjectId | string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  date: Date | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const eventSchema = new Schema<Event>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
    title: { type: String, default: '', required: true },
    description: { type: String, default: '', required: true },
    location: { type: Object, default: { lat: 0, lng: 0 } },
    date: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
export const EventModel = models.Event ?? model<Event>('Event', eventSchema);

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
  location: {
    lat: number;
    lng: number;
  };
}

export interface SearchOptions extends KakaoSearchOptions {
  query: string;
  mapType: MapType;
}
export interface SearchResponse {
  places?: Place[];
}
