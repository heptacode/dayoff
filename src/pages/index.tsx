import { PlanCard } from '@/components/plans/PlanCard';
import { usePlanQuery } from '@/hooks/queries/plan';
import { useCollectionStore } from '@/stores/collectionStore';
import { usePlanStore } from '@/stores/planStore';
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

export default function Home() {
  const planStore = usePlanStore();
  const collectionStore = useCollectionStore();
  const { plans, createPlan } = usePlanQuery({});

  useEffect(() => {
    collectionStore.clearCollections();
  }, []);

  function renderPlanTiles() {
    if (planStore.isLoading) {
      return [...Array(4).keys()].map(n => <Skeleton key={n} height="152px" borderRadius="md" />);
    } else if (plans?.length) {
      return plans.map(plan => (
        <Fade key={plan._id} in>
          <PlanCard
            plan={plan}
            cursor="pointer"
            _hover={{
              boxShadow: 'md',
            }}
          />
        </Fade>
      ));
    } else {
      return <></>;
    }
  }

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
          {renderPlanTiles()}
        </SimpleGrid>
      </Container>
    </>
  );
}
