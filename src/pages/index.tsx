import { PlanCard } from '@/components/plans/PlanCard';
import { usePlanStore } from '@/stores/planStore';
import { Box, Container, Heading, HStack, SimpleGrid } from '@chakra-ui/react';
import { getRequest } from '@heptacode/http-request';
import { useQuery } from '@tanstack/react-query';
import type { IPlan } from '@/types';

export default function Home() {
  const planStore = usePlanStore();

  useQuery<IPlan[]>(['plans'], async () => (await getRequest<IPlan[]>(`/api/plans`)).data, {
    onSuccess(data) {
      planStore.setPlans(data);
      planStore.setIsLoading(false);
    },
  });

  return (
    <>
      <Box as="header" mb={{ base: '12', md: '24' }}>
        <Box as="nav" bg="bg-surface" boxShadow="sm">
          <Container py={{ base: '4', lg: '5' }}>
            <HStack spacing="10" justify="space-between">
              <Heading size="lg">Dayoff</Heading>
            </HStack>
          </Container>
        </Box>
      </Box>

      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {planStore.plans.map(plan => (
          <PlanCard plan={plan} key={plan._id} />
        ))}
      </SimpleGrid>
    </>
  );
}
