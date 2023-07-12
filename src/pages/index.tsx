import { PlanCard } from '@/components/plans/PlanCard';
import { useCollectionStore } from '@/stores/collectionStore';
import { IPlan } from '@/types';
import { Box, Container, Fade, Heading, HStack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getPlans } from './api/plans';

export async function getServerSideProps() {
  const plans = await getPlans();

  return { props: { plans: JSON.parse(JSON.stringify(plans)) } };
}

export default function Home({ plans }: { plans: IPlan[] }) {
  const collectionStore = useCollectionStore();

  useEffect(() => {
    collectionStore.clearCollections();
  }, []);

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
          {plans.length
            ? plans.map(plan => (
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
            : [...Array(4).keys()].map(n => <Skeleton key={n} height="152px" borderRadius="md" />)}
        </SimpleGrid>
      </Container>
    </>
  );
}
