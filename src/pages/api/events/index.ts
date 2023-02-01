import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Event } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(await Event.find());
    }
    case 'POST': {
      const event = await Event.create({
        title: req.body.title ?? '이벤트 제목',
        subtitle: req.body.subtitle ?? '이벤트 부제목',
        lat: req.body.lat ?? 0,
        lng: req.body.lng ?? 0,
        date: req.body.date ?? new Date(req.body.date),
      });
      return res.status(201).send(event);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
