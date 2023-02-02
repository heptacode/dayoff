import { PlanCard } from '@/components/plans/PlanCard';
import { usePlanQuery } from '@/hooks/queries/plan';
import { usePlanStore } from '@/stores/planStore';
import { Box, Container, Heading, HStack, SimpleGrid } from '@chakra-ui/react';

export default function Home() {
  const planStore = usePlanStore();
  usePlanQuery({
    onPlansSuccess(data) {
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
