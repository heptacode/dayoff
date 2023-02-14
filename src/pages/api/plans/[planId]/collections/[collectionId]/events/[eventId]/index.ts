import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'PATCH': {
      await Event.findByIdAndUpdate(req.query.eventId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.lat && { lat: req.body.lat }),
        ...(req.body.lng && { lng: req.body.lng }),
        ...(req.body.date && { date: new Date(req.body.date) }),
        ...(req.body.collectionId && { collectionId: req.body.collectionId }),
      });
      return res.status(204).send('');
    }
    case 'DELETE': {
      await Event.findByIdAndDelete(req.query.eventId);
      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
