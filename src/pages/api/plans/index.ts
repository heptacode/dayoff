import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { IPlan, Plan } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      const plans = await Plan.find().where({ deletedAt: null });
      if (plans) {
        return res.status(200).json(plans);
      }
      return res.status(404).json('');
    }
    case 'POST': {
      const plan = await Plan.create<IPlan>({
        title: req.body.title ?? '계획 이름',
        subtitle: req.body.subtitle ?? '새로운 계획',
        mapType: req.body.mapType ?? 'google',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
      return res.status(201).send(plan);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
