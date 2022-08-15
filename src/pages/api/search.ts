import { getRequest } from '@/modules/httpRequest';
import { SearchAPIResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchAPIResponse>
) {
  try {
    const response: SearchAPIResponse = await getRequest<SearchAPIResponse>(
      `https://map.naver.com/v5/api/instantSearch`,
      {
        types: 'place,address',
        coords: `${req.query.lat},${req.query.lng}`,
        query: String(req.query.query),
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500);
  }
}
