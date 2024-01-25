import { isValidObjectId } from 'mongoose';
import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { CollectionModel, EventModel, ProjectModel } from '@/types';
import type { NextApiResponse } from 'next';

interface ApiRequest extends NextApiRequestWithMongoose {
  query: {
    projectId: string;
    collectionId: string;
  };
}

export default withMongoose(async (req: ApiRequest, res: NextApiResponse<any>) => {
  if (!isValidObjectId(req.query.projectId) || !isValidObjectId(req.query.collectionId)) {
    return res.status(400).send('');
  }

  switch (req.method) {
    case 'PATCH': {
      const collection = await CollectionModel.findByIdAndUpdate(req.query.collectionId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.color && { color: req.body.color }),
      });
      if (collection) {
        return res.status(202).send(collection);
      }
      return res.status(404).send('');
    }
    case 'DELETE': {
      const session = await req.mongoose.startSession();
      session.startTransaction();

      await ProjectModel.findByIdAndUpdate(req.query.projectId, {
        $pull: { collectionIds: req.query.collectionId },
      }).session(session);

      await CollectionModel.findByIdAndUpdate(req.query.collectionId, {
        deletedAt: new Date(),
      }).session(session);

      await EventModel.updateMany(
        { collectionId: req.query.collectionId },
        { deletedAt: new Date() },
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
