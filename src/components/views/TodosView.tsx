import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import Project from '../todo/Project'
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

const TodosView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // プロジェクトの初期値設定(あとで消す)
  const initProjects = [
    {
      id: 1,
      name: 'Project 1',
    },
    {
      id: 2,
      name: 'Project 2',
    }
  ];

  const [projects, setProjects] = useState(initProjects);
  const [projectName, setProjectName] = useState('');

  // プロジェクト名入力時の処理
  const handleInputProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  }

  // プロジェクト作成時の処理
  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: projectName
    }
    setProjects([...projects, newProject]);
    setProjectName('');
    onClose();
  }

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
        <IconButton size='sm' bgColor='gray.300' w='20px' aria-label="add project" icon={<AddIcon color='white' />} shadow='base' onClick={onOpen} />
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロジェクトを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>プロジェクト名</FormLabel>
              <Input type='text' placeholder='プロジェクト名' onChange={handleInputProjectName} value={projectName} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleCreateProject} >
              作成
            </Button>
            <Button size='sm' variant="outline" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodosView