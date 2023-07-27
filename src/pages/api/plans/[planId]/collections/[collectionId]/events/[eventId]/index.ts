import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import { isValidObjectId } from 'mongoose';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  if (
    !isValidObjectId(req.query.planId) ||
    !isValidObjectId(req.query.collectionId) ||
    !isValidObjectId(req.query.eventId)
  ) {
    return res.status(400).send('');
  }

  switch (req.method) {
    case 'PATCH': {
      const event = await Event.findByIdAndUpdate(req.query.eventId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.lat && { lat: req.body.lat }),
        ...(req.body.lng && { lng: req.body.lng }),
        ...(req.body.date && { date: new Date(req.body.date) }),
        ...(req.body.collectionId && { collectionId: req.body.collectionId }),
      });
      if (event) {
        return res.status(202).json(event);
      }
      return res.status(404).send('');
    }
    case 'DELETE': {
      const event = await Event.findByIdAndUpdate(req.query.eventId, { deletedAt: new Date() });
      if (event) {
        return res.status(204).send('');
      }
      return res.status(404).send('');
    }
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
