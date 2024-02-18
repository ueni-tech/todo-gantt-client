import { Box, Button, Flex, FormControl, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel } from '@chakra-ui/react'
import React, { FC, useEffect, useRef, useState } from 'react'
import Task from './Task'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

type Props = {
  project: {
    id: number,
    name: string,
  }
}

type Task = {
  id: number,
  project_id: number,
  name: string,
  done: boolean
}

const Project: FC<Props> = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editingProjectMode, setEditingProjectMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const [editStartProjectName, setEditStartProjectName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);



  useEffect(() => {
    // jsonフォルダにあるtasks.jsonを読み込む
    const initTasks = async () => {
      const res = await fetch('/json/tasks.json');
      const data = await res.json();
      const filteredData = data.filter((task: Task) => task.project_id === project.id);
      console.log(filteredData);
      setTasks(filteredData);
    }
    initTasks();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  //プロジェクト名編集モードになったらInputにfocusを当てる
  useEffect(() => {
    if (editingProjectMode) {
      inputRef.current?.focus();
    }
  }, [editingProjectMode]);

  // プロジェクト名編集モードの切り替え処理
  const handleEditingProjectMode = () => {
    setEditingProjectMode(!editingProjectMode);

    if (editingProjectMode) {
      setEditStartProjectName(editedProjectName);
    }

    if (editedProjectName.trim() === '') {
      setEditedProjectName(editStartProjectName);
    }
  }

  // プロジェクト名編集処理
  const handleEditedProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProjectName(e.target.value);
  }

  return (
    <>
      <Box p={4} bgColor='blackAlpha.300' borderRadius='md' shadow='base'>
        <Flex justify='space-between' align='center' mb={3}>
          {editingProjectMode ? (
            <FormControl>
              <Input ref={inputRef} fontSize='xs' type='text' placeholder='プロジェクト名を入力してください' value={editedProjectName} onBlur={handleEditingProjectMode} onChange={handleEditedProjectName} />
            </FormControl>
          ) : (
            <Heading fontSize='xs' onClick={handleEditingProjectMode} py={3}>{editedProjectName}</Heading>
          )}
          <Popover>
            <PopoverTrigger>
              <DeleteIcon color='blackAlpha.200' cursor='pointer' _hover={{ color: 'blackAlpha.500' }} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>このプロジェクトを削除しますか？</PopoverHeader>
              <PopoverBody>
                <Button colorScheme='red' variant='outline' size='sm'>削除</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <Stack spacing={4}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          <IconButton size='sm' colorScheme='blackAlpha' w='20px' aria-label="add task" icon={<AddIcon />} shadow='base' onClick={onOpen} />
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>タスク名</FormLabel>
                <Input type='text' placeholder='タスク名' />
              </FormControl>
              <FormControl>
                <FormLabel>開始日</FormLabel>
                <Input type='date' />
              </FormControl>
              <FormControl>
                <FormLabel>終了日</FormLabel>
                <Input type='date' />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3}>
              作成
            </Button>
            <Button size='sm' variant="outline">
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Project