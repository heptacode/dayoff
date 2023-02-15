import { usePlanEdit } from '@/hooks/planEdit';
import { usePlanStore } from '@/stores/planStore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Progress,
  Stack,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';

export function PlanEditModal(props: Partial<ModalProps>) {
  const planStore = usePlanStore();

  const { isOpen, onClose } = useDisclosure({
    ...props,
  });
  const { handleTitleSave, handleSubtitleSave, handlePlanDelete } = usePlanEdit();

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {planStore.isLoading ? <Progress size="xs" isIndeterminate /> : <Box h="1" />}
        <ModalHeader>계획 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl>
              <FormLabel>계획 제목</FormLabel>
              <Input
                placeholder="제목 입력"
                value={planStore.title}
                isDisabled={planStore.isLoading}
                onChange={e => planStore.setTitle(e.target.value)}
                onBlur={() => handleTitleSave()}
              />
            </FormControl>

            <FormControl>
              <FormLabel>계획 부제목</FormLabel>
              <Input
                placeholder="부제목 입력"
                value={planStore.subtitle}
                isDisabled={planStore.isLoading}
                onChange={e => planStore.setSubtitle(e.target.value)}
                onBlur={() => handleSubtitleSave()}
              />
            </FormControl>

            <Box>
              <Button
                colorScheme="red"
                disabled={planStore.isLoading}
                onClick={() => handlePlanDelete()}
              >
                <Icon as={MdDeleteForever} boxSize="5" />
                삭제
              </Button>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
