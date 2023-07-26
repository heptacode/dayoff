import { PlanCard } from '@/components/plans/PlanCard';
import { usePlanQuery } from '@/hooks/queries/plan';
import { useCollectionStore } from '@/stores/collectionStore';
import { IPlan } from '@/types';
import {
  Box,
  Button,
  Container,
  Fade,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

export async function getServerSideProps() {
  const plans = await (await fetch('http://localhost:3000/api/plans')).json();

  return { props: { plans: JSON.parse(JSON.stringify(plans)) } };
}

export default function Home({ plans }: { plans: IPlan[] }) {
  const collectionStore = useCollectionStore();
  const { createPlan } = usePlanQuery({});

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

      <Button onClick={() => createPlan()}>
        <Icon as={MdAdd} mr="1" />
        추가
      </Button>

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
