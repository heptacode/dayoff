import { isValidObjectId } from 'mongoose';
import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection, CollectionModel, ProjectModel } from '@/types';
import type { NextApiResponse } from 'next';

interface ApiRequest extends NextApiRequestWithMongoose {
  query: {
    projectId: string;
  };
}

export default withMongoose(async (req: ApiRequest, res: NextApiResponse<any>) => {
  if (!isValidObjectId(req.query.projectId)) {
    return res.status(400).send('');
  }

  switch (req.method) {
    case 'GET': {
      const collection = await CollectionModel.find({
        projectId: req.query.projectId,
        deletedAt: null,
      });
      if (collection) {
        return res.status(200).json(collection);
      }
      return res.status(404).send('');
    }
    case 'POST': {
      const documentCount = await CollectionModel.countDocuments({
        projectId: req.query.projectId,
        deletedAt: null,
      });
      if (documentCount >= 15) {
        return res.status(402).send('');
      }

      const collection = await CollectionModel.create({
        projectId: req.query.projectId,
        title: req.body.title ?? '새 컬렉션',
        color: req.body.color ?? 'blue',
        deletedAt: null,
      } satisfies Omit<Collection, '_id' | 'createdAt' | 'updatedAt'>);

      await ProjectModel.findByIdAndUpdate(req.query.projectId, {
        $push: { collectionIds: collection.id },
      });

      return res.status(201).send(collection);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
