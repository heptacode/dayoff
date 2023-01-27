import { getRequest } from '@heptacode/http-request';
import type { KeywordSearchAPIResponse, KeywordSearchResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KeywordSearchResponse>
) {
  try {
    // https://apis.map.kakao.com/web/sample/keywordBasic/
    const { data, status } = await getRequest<KeywordSearchAPIResponse>(
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

    res
      .setHeader('Cache-Control', 'no-store')
      .status(status)
      .json({
        meta: data.meta,
        places: data.documents?.map(place => {
          return {
            ...place,
            x: Number(place.x),
            y: Number(place.y),
            road_address_name: place.road_address_name.length
              ? place.road_address_name
              : place.address_name,
          };
        }),
      });
  } catch {
    res.setHeader('Cache-Control', 'no-store').status(500);
  }
}
