import { Flex } from '@chakra-ui/react';
import Image from 'next/image';

export function ErrorOverlay() {
  return (
    <Flex h="full" flexDirection="column" justifyContent="center" alignItems="center">
      <h6>문제가 발생했어요 :&#40;</h6>

      <Image
        src="/undraw_not_found_-60-pq.svg"
        alt="Not Found"
        loading="lazy"
        width={160}
        height={160}
      />
    </Flex>
  );
}
