import { isValidObjectId } from 'mongoose';
import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Collection, CollectionModel, Event, EventModel } from '@/types';
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
    case 'GET': {
      const collection = await CollectionModel.findOne<Collection>({
        _id: req.query.collectionId,
        deletedAt: null,
      });

      if (!collection) {
        return res.status(404).send('');
      }

      const events = await EventModel.find({
        collectionId: req.query.collectionId,
        deletedAt: null,
      } satisfies Partial<Event>);

      if (events) {
        if (collection.eventIds.length > 1) {
          events.sort((a, b) => {
            return collection.eventIds.indexOf(a._id) - collection.eventIds.indexOf(b._id);
          });
        }
        return res.status(200).json(events);
      }
      return res.status(404).send('');
    }

    case 'POST': {
      const documentCount = await EventModel.countDocuments({
        collectionId: req.query.collectionId,
      });
      if (documentCount >= 50) {
        return res.status(402).send('');
      }

      const event = await EventModel.create({
        projectId: req.query.projectId,
        collectionId: req.query.collectionId,
        title: req.body.title ?? '이벤트 제목',
        description: req.body.description ?? '이벤트 설명',
        location: req.body.location ?? { lat: 0, lng: 0 },
        date: req.body.date ?? new Date(),
        deletedAt: null,
      } satisfies Omit<Event, '_id' | 'createdAt' | 'updatedAt'>);

      await CollectionModel.findByIdAndUpdate(req.query.collectionId, {
        $push: { eventIds: event.id },
      });

      return res.status(201).send(event);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
