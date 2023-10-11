import { getRequest } from '@heptacode/http-request';
import type { KakaoSearchResponse, SearchResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  try {
    if (!req.query.query?.length) {
      return res.status(404).json({});
    }

    switch (req.query.mapType) {
      case 'google': {
        const { data, status } = await getRequest<{
          candidates: [
            google.maps.GeocoderResult & {
              name: string;
              geometry: { location: google.maps.LatLngLiteral };
            }
          ];
        }>(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, {
          inputtype: 'textquery',
          input: req.query.query ? String(req.query.query) : '',
          fields: 'name,formatted_address,geometry',
          key: process.env.GCP_PLACES_KEY,
        });

        return res
          .setHeader('Cache-Control', 'no-store')
          .status(status)
          .json({
            places: data.candidates?.map(place => {
              return {
                id: place.place_id,
                name: place.name,
                address: place.formatted_address,
                location: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
              };
            }),
          } satisfies SearchResponse);
      }
      case 'naver': {
        // https://apis.map.kakao.com/web/sample/keywordBasic
        const { data, status } = await getRequest<KakaoSearchResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json`,
          {
            query: req.query.query ? String(req.query.query) : '',
            size: 7,
            sort: 'accuracy',
          },
          {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_KEY}`,
            },
          }
        );

        return res
          .setHeader('Cache-Control', 'no-store')
          .status(status)
          .json({
            places: data.documents?.map(place => {
              return {
                id: place.id,
                name: place.place_name,
                address: place.road_address_name.length
                  ? place.road_address_name
                  : place.address_name,
                location: {
                  lat: Number(place.y),
                  lng: Number(place.x),
                },
              };
            }),
          } satisfies SearchResponse);
      }
      default: {
        return res.status(404).json({});
      }
    }
  } catch {
    return res.setHeader('Cache-Control', 'no-store').status(500);
  }
}
