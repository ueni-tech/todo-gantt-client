import { Box, Button, Flex, FormControl, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Task from './Task'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

type Props = {
  project: {
    id: number,
    name: string,
  },
  tasks: {
    id: number,
    project_id: number,
    name: string,
    start_date: string,
    end_date: string,
    is_completed: boolean
  }[],
  setTasks: React.Dispatch<React.SetStateAction<{
    id: number;
    project_id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_completed: boolean;
  }[]>>
}

type Task = {
  id: number,
  project_id: number,
  name: string,
  start_date: string,
  end_date: string,
  is_completed: boolean
}

const Project: FC<Props> = ({ project, tasks, setTasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editingProjectMode, setEditingProjectMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const [editStartProjectName, setEditStartProjectName] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // tasksをproject_idでフィルタリングして更新
    const projectID = Number(project.id);
    const filteredData = tasks.filter((task: Task) => task.project_id === projectID);
    console.log(filteredData);
    setFilteredTasks(filteredData);
  }, [tasks, project.id]);
  

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
  const handleEditedProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedProjectName(e.target.value);
  }

  // タスク名入力処理
  const handleInputTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }

  // タスク作成処理
  const handleCreateTask = () => {
    if (taskName.trim() === '' || startDate.trim() === '' || endDate.trim() === '') {
      return;
    }

    const response = fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: tasks.length + 1,
        project_id: project.id,
        name: taskName,
        start_date: startDate,
        end_date: endDate,
        is_completed: false
      })
    });
  }

  // モーダルを閉じる処理
  const onModalClose = () => {
    setTaskName('');
    setStartDate('');
    setEndDate('');
    onClose();
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
          {filteredTasks.map((task) => (
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
                <Input type='text' placeholder='タスク名' value={taskName} onChange={handleInputTaskName} />
              </FormControl>
              <FormControl>
                <FormLabel>開始日</FormLabel>
                <Input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>終了日</FormLabel>
                <Input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleCreateTask}>
              作成
            </Button>
            <Button size='sm' variant="outline" onClick={onModalClose} >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Project