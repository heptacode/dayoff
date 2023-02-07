import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(await Collection.find({ planId: req.query.planId }));
    }
    case 'POST': {
      const collection = await Collection.create({
        planId: req.query.planId,
        title: req.body.title ?? '',
      });
      return res.status(201).send(collection);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
