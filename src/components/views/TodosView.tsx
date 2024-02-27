import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Project from '../todo/Project'
import { AddIcon } from '@chakra-ui/icons'
import useProjects from '@/hooks/useProjects'
import { NEXT_PUBLIC_BACKEND_API_URL } from '@/env'
import { ProjectType } from '../../../types/types'

const TodosView = () => {
  const { projects, addProject } = useProjects(`${NEXT_PUBLIC_BACKEND_API_URL}/projects`);
  const [projectName, setProjectName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(true);

  // プロジェクト名入力時の処理
  const handleInputProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  }

  // プロジェクト作成時の処理
  const handleCreateProject = () => {
    if (!projectName.trim()) return;
    const newProject = {
      name: projectName
    }
    addProject(newProject);
    onModalClose();
  }

  // プロジェクト名が空かどうかでボタンを制御
  useMemo(() => {
    setIsDisabled(!projectName.trim());
  }, [projectName]);

  // モーダルを閉じる処理
  const onModalClose = () => {
    setProjectName('');
    onClose();
  }

  return (
    <>
      <SimpleGrid p={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
        {projects?.map((project: ProjectType) => (
          <Project key={project.id} project={project} />
        ))}
        <IconButton size='sm' bgColor='gray.300' w='20px' aria-label="add project" icon={<AddIcon color='white' />} shadow='base' onClick={onOpen} />
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロジェクトを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>プロジェクト名</FormLabel>
              <Input type='text' placeholder='プロジェクト名を入力' onChange={handleInputProjectName} value={projectName} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleCreateProject} isDisabled={isDisabled} >
              作成
            </Button>
            <Button size='sm' variant="outline" onClick={onModalClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodosView