import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Plan } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      const plan = await Plan.findOne({ _id: req.query.planId, deletedAt: null });
      if (plan) {
        return res.status(200).json(plan);
      }
      return res.status(404).send('');
    }
    case 'PATCH': {
      const plan = await Plan.findOneAndUpdate(
        { _id: req.query.planId, deletedAt: null },
        {
          ...(req.body.title && { title: req.body.title }),
          ...(req.body.subtitle && { subtitle: req.body.subtitle }),
          ...(req.body.mapType && { mapType: req.body.mapType }),
          updatedAt: new Date(),
        }
      );
      if (plan) {
        return res.status(202).send(plan);
      }
      return res.status(404).send('');
    }
    case 'DELETE': {
      const plan = await Plan.findByIdAndUpdate(req.query.planId, { deletedAt: new Date() });
      if (plan) {
        return res.status(204).send('');
      }
      return res.status(404).send('');
    }
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
