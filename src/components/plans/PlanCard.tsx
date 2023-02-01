import { IPlan } from '@/types';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export function PlanCard({ plan }: { plan: IPlan }) {
  const router = useRouter();

  return (
    <Card maxW="sm" onClick={() => router.push(`/${plan._id}`)}>
      <CardBody>
        <Heading size="md">{plan.title}</Heading>
        <Text>{plan.subtitle}</Text>
      </CardBody>
    </Card>
  );
}
