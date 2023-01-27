import { Box, Container, Heading, HStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <Heading size="lg">Dayoff</Heading>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
