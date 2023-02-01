import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Plan } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(
        await Plan.findById(req.query.planId).populate({
          path: 'collections',
          populate: {
            path: 'events',
            model: 'Event',
          },
        })
      );
    }
    case 'PATCH': {
      await Plan.findByIdAndUpdate(req.query.planId, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.subtitle && { subtitle: req.body.subtitle }),
        updatedAt: new Date(),
      });
      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
