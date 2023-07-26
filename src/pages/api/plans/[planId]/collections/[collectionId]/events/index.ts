import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      const event = await Event.find({ collectionId: req.query.collectionId, deletedAt: null });
      if (event) {
        return res.status(200).json(event);
      }
      return res.status(404).send('');
    }

    case 'POST': {
      const documentCount = await Event.countDocuments({ collectionId: req.query.collectionId });
      if (documentCount >= 50) {
        return res.status(402).send('');
      }

      const event = await Event.create({
        planId: req.query.planId,
        collectionId: req.query.collectionId,
        title: req.body.title ?? '이벤트 제목',
        description: req.body.description ?? '이벤트 설명',
        lat: req.body.lat ?? 0,
        lng: req.body.lng ?? 0,
        date: req.body.date ?? new Date(),
        deletedAt: null,
      });
      return res.status(201).send(event);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
