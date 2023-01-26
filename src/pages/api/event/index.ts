import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(await Event.find());
    }
    case 'POST': {
      await Event.create({
        title: req.body.title ?? '',
        subtitle: req.body.subtitle ?? '',
        description: req.body.description ?? '',
        lat: req.body.lat ?? '',
        lng: req.body.lng ?? '',
        date: req.body.date ? new Date(req.body.date) : null,
      });
      return res.status(201).send('');
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
