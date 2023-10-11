import { Card, CardBody, CardFooter, CardProps, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { IProject } from '@/types';

export function ProjectCard({ project, ...props }: { project: IProject } & Partial<CardProps>) {
  const router = useRouter();

  return (
    <Card maxW="sm" onClick={() => router.push(`/${project._id}`)} {...props}>
      <CardBody>
        <Heading size="md">{project.title}</Heading>
        <Text>{project.subtitle}</Text>
      </CardBody>
      <CardFooter>
        <Text>{new Intl.DateTimeFormat('ko-KR').format(new Date(project.updatedAt))}</Text>
      </CardFooter>
    </Card>
  );
}
