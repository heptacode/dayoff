import { NextApiRequestWithMongoose, withMongoose } from '@/hooks/mongoose';
import { IProject, Project } from '@/types';
import type { NextApiResponse } from 'next';

export default withMongoose(async (req: NextApiRequestWithMongoose, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      const projects = await Project.find().where({ deletedAt: null });
      if (projects) {
        return res.status(200).json(projects);
      }
      return res.status(404).json('');
    }
    case 'POST': {
      const project = await Project.create<IProject>({
        title: req.body.title ?? '프로젝트 이름',
        subtitle: req.body.subtitle ?? '새로운 프로젝트',
        mapType: req.body.mapType ?? 'naver',
        collectionIds: [],
        deletedAt: null,
      });
      return res.status(201).send(project);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
