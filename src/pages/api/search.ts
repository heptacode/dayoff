import { getRequest } from '@/modules/httpRequest';
import { Place, SearchAPIResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Place[]>) {
  try {
    const response: SearchAPIResponse = await getRequest<SearchAPIResponse>(
      `https://openapi.naver.com/v1/search/local`,
      {
        query: req.body.query,
        display: '5',
      },
      {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      }
    );
    res.status(200).json(response.items);
  } catch (error) {
    res.status(500);
  }
}
