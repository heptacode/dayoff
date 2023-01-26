import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'PATCH': {
      await Event.findByIdAndUpdate(req.query.eventId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.subtitle && { subtitle: req.body.subtitle }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.lat && { lat: req.body.lat }),
        ...(req.body.lng && { lng: req.body.lng }),
      });
      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
