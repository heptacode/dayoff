import { isValidObjectId } from 'mongoose';
import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection, CollectionModel, Project, ProjectModel } from '@/types';
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
      const project = await ProjectModel.findOne<Project>({
        _id: req.query.projectId,
        deletedAt: null,
      });

      if (!project || !project.collectionIds?.length) {
        return res.status(404).send('');
      }

      const collections = await CollectionModel.find({
        projectId: req.query.projectId,
        deletedAt: null,
      });

      if (collections) {
        collections.sort((a, b) => {
          return project.collectionIds.indexOf(a._id) - project.collectionIds.indexOf(b._id);
        });

        return res.status(200).json(collections);
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
        eventIds: [],
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
