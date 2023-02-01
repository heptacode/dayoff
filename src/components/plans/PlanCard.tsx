import { Card, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { IPlan } from '@/types';

export function PlanCard({ plan }: { plan: IPlan }) {
  const router = useRouter();

  return (
    <Card maxW="sm" onClick={() => router.push(`/${plan._id}`)}>
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
