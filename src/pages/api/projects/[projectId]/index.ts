import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { Project } from '@/types';
import { isValidObjectId } from 'mongoose';
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
      const project = await Project.findOne({ _id: req.query.projectId, deletedAt: null });
      if (project) {
        return res.status(200).json(project);
      }
      return res.status(404).send('');
    }
    case 'PATCH': {
      const project = await Project.findOneAndUpdate(
        { _id: req.query.projectId, deletedAt: null },
        {
          ...(req.body.title && { title: req.body.title }),
          ...(req.body.subtitle && { subtitle: req.body.subtitle }),
          ...(req.body.mapType && { mapType: req.body.mapType }),
        }
      );
      if (project) {
        return res.status(202).send(project);
      }
      return res.status(404).send('');
    }
    case 'DELETE': {
      const project = await Project.findByIdAndUpdate(req.query.projectId, {
        deletedAt: new Date(),
      });
      if (project) {
        return res.status(204).send('');
      }
      return res.status(404).send('');
    }
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
