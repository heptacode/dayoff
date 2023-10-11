import { useProject } from '@/hooks/project';
import { useProjectStore } from '@/stores/projectStore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';

export function ProjectEditModal(props: Partial<ModalProps>) {
  const projectStore = useProjectStore();

  const { isOpen, onClose } = useDisclosure({
    ...props,
  });
  const {
    title,
    subtitle,
    handleTitleInput,
    handleTitleSave,
    handleSubtitleInput,
    handleSubtitleSave,
    handleMapTypeChange,
    handleProjectDelete,
  } = useProject();

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {projectStore.isLoading ? <Progress size="xs" isIndeterminate /> : <Box h="1" />}
        <ModalHeader>프로젝트 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl>
              <FormLabel>프로젝트 제목</FormLabel>
              <Input
                placeholder="제목 입력"
                value={title}
                isDisabled={projectStore.isLoading}
                onChange={e => handleTitleInput(e.target.value)}
                onBlur={handleTitleSave}
              />
            </FormControl>

            <FormControl>
              <FormLabel>프로젝트 부제목</FormLabel>
              <Input
                placeholder="부제목 입력"
                value={subtitle}
                isDisabled={projectStore.isLoading}
                onChange={e => handleSubtitleInput(e.target.value)}
                onBlur={handleSubtitleSave}
              />
            </FormControl>

            <FormControl>
              <FormLabel>프로젝트 유형</FormLabel>
              <HStack>
                <Tooltip label="네이버 지도">
                  <Button
                    placeholder="부제목 입력"
                    isDisabled={projectStore.isLoading}
                    variant={projectStore.mapType === 'naver' ? 'solid' : 'outline'}
                    onClick={() => handleMapTypeChange('naver')}
                  >
                    🇰🇷 전국
                  </Button>
                </Tooltip>

                <Tooltip label="Google 지도">
                  <Button
                    placeholder="부제목 입력"
                    isDisabled={projectStore.isLoading}
                    variant={projectStore.mapType === 'google' ? 'solid' : 'outline'}
                    onClick={() => handleMapTypeChange('google')}
                  >
                    🌏 전세계
                  </Button>
                </Tooltip>
              </HStack>
            </FormControl>

            <Box>
              <Button
                colorScheme="red"
                disabled={projectStore.isLoading}
                onClick={handleProjectDelete}
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
