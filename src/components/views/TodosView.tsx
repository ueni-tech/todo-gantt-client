import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import React, { ChangeEvent, use, useEffect, useState } from 'react'
import Project from '../todo/Project'
import { AddIcon } from '@chakra-ui/icons'
import useTasks from '@/hooks/useTasks'

type Project = {
  id: number,
  name: string
}

const TodosView = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState('');
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, addTask } = useTasks('http://localhost:3001/tasks');

  useEffect(() => {
    // server.jsonのprojectsを読み込む
    const initProjects = async () => {
      const res = await fetch('http://localhost:3001/projects');
      const data = await res.json();
      setProjects(data);
    }

    initProjects();
  }, []);

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

  // モーダルを閉じる処理
  const onModalClose = () => {
    setProjectName('');
    onClose();
  }

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
        {projects.map((project) => (
          <Project key={project.id} project={project} tasks={tasks} addTask={addTask} />
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