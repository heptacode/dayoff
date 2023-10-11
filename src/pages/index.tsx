import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjectQuery } from '@/hooks/queries/project';
import { useCollectionStore } from '@/stores/collectionStore';
import { useProjectStore } from '@/stores/projectStore';
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
  const projectStore = useProjectStore();
  const collectionStore = useCollectionStore();
  const { projects, createProject } = useProjectQuery({});

  useEffect(() => {
    collectionStore.clearCollections();
  }, []);

  function renderProjectTiles() {
    if (projectStore.isLoading) {
      return [...Array(4).keys()].map(n => <Skeleton key={n} height="152px" borderRadius="md" />);
    } else if (projects?.length) {
      return projects.map(project => (
        <Fade key={project._id} in>
          <ProjectCard
            project={project}
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
              <Button onClick={() => createProject()}>
                <Icon as={MdAdd} mr="1" />
                만들기
              </Button>
            </HStack>
          </Container>
        </Box>
      </Box>

      <Container>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
          {renderProjectTiles()}
        </SimpleGrid>
      </Container>
    </>
  );
}
