import { PlanCard } from '@/components/plans/PlanCard';
import { usePlansQuery } from '@/hooks/queries/plans';
import { usePlanStore } from '@/stores/planStore';
import { Box, Container, Heading, HStack, SimpleGrid } from '@chakra-ui/react';

export default function Home() {
  const planStore = usePlanStore();
  usePlansQuery({
    onFetchSuccess(data) {
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
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </SimpleGrid>
    </>
  );
}
