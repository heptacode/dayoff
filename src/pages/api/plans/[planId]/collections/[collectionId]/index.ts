import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'PATCH': {
      await Collection.findByIdAndUpdate(req.query.collectionId, {
        ...(req.body.title && { title: req.body.title }),
      });
      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
