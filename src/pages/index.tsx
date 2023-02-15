import { PlanCard } from '@/components/plans/PlanCard';
import { usePlansQuery } from '@/hooks/queries/plans';
import { usePlanStore } from '@/stores/planStore';
import { Box, Container, Fade, Heading, HStack, SimpleGrid, Skeleton } from '@chakra-ui/react';

export default function Home() {
  const planStore = usePlanStore();
  usePlansQuery();

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

      <Container>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
          {planStore.plans.length
            ? planStore.plans.map(plan => (
                <Fade key={plan._id} in>
                  <PlanCard
                    plan={plan}
                    cursor="pointer"
                    _hover={{
                      boxShadow: 'md',
                    }}
                  />
                </Fade>
              ))
            : [...Array(4)].map(n => <Skeleton key={n} height="152px" borderRadius="md" />)}
        </SimpleGrid>
      </Container>
    </>
  );
}
