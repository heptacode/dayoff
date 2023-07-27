import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection } from '@/types';
import { isValidObjectId } from 'mongoose';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  if (!isValidObjectId(req.query.planId)) {
    return res.status(400).send('');
  }

  switch (req.method) {
    case 'GET': {
      const collection = await Collection.find({ planId: req.query.planId, deletedAt: null });
      if (collection) {
        return res.status(200).json(collection);
      }
      return res.status(404).send('');
    }
    case 'POST': {
      const documentCount = await Collection.countDocuments({
        planId: req.query.planId,
        deletedAt: null,
      });
      if (documentCount >= 15) {
        return res.status(402).send('');
      }

      const collection = await Collection.create({
        planId: req.query.planId,
        title: req.body.title ?? '새 컬렉션',
        color: req.body.color ?? 'blue',
        deletedAt: null,
      });
      return res.status(201).send(collection);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
