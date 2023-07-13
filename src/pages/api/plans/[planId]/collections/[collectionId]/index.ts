import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection, Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'PATCH': {
      const collection = await Collection.findByIdAndUpdate(req.query.collectionId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.color && { color: req.body.color }),
        updatedAt: new Date(),
      });
      if (collection) {
        return res.status(202).send(collection);
      }
      return res.status(404).send('');
    }
    case 'DELETE': {
      const session = await req.mongoose.startSession();
      session.startTransaction();

      await Collection.findByIdAndUpdate(req.query.collectionId, {
        deletedAt: new Date(),
      }).session(session);
      await Event.updateMany(
        { collectionId: req.query.collectionId },
        { deletedAt: new Date() }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
