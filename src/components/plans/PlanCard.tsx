import { Card, CardBody, CardFooter, CardProps, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { IPlan } from '@/types';

export function PlanCard({ plan, ...props }: { plan: IPlan } & Partial<CardProps>) {
  const router = useRouter();

  return (
    <Card maxW="sm" onClick={() => router.push(`/${plan._id}`)} {...props}>
      <CardBody>
        <Heading size="md">{plan.title}</Heading>
        <Text>{plan.subtitle}</Text>
      </CardBody>
      <CardFooter>
        <Text>{new Intl.DateTimeFormat('ko-KR').format(new Date(plan.updatedAt))}</Text>
      </CardFooter>
    </Card>
  );
}
