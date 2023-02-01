import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { IPlan, Plan } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(await Plan.find());
    }
    case 'POST': {
      const plan = await Plan.create<IPlan>({
        title: req.body.title ?? '계획 이름',
        subtitle: req.body.subtitle ?? '새로운 계획',
        collections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(201).send(plan);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
