import { Box, Button, Flex, FormControl, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Task from './Task'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import useTasks from '@/hooks/useTasks'
import useProjects from '@/hooks/useProjects'

type Props = {
  project: {
    id: string,
    name: string,
  }
}

type Task = {
  id: string,
  project_id: string,
  name: string,
  start_date: string,
  end_date: string,
  is_completed: boolean
}

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + date.getDate()).slice(-2)}`;
}

const nextDay = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + date.getDate()).slice(-2)}`;
}

const Project: FC<Props> = ({ project }) => {
  const { deleteProject, updateProject } = useProjects('http://localhost:3001/projects');
  const { tasks, addTask } = useTasks('http://localhost:3001/tasks');
  const { isOpen: isCreateTaskOpen, onOpen: onCreateTaskOpen, onClose: onCreateTaskClose } = useDisclosure();
  const [editingProjectMode, setEditingProjectMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(nextDay());
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // tasksをproject_idでフィルタリングして更新
    if (tasks) {
      const filteredData = tasks.filter((task: Task) => {
        return task.project_id === project.id;
      });
      setFilteredTasks(filteredData);
    }
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
  }

  // プロジェクト名編集処理
  const handleEditedProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedProjectName(e.target.value);
  }

  // プロジェクト名更新処理
  const handleUpdateProject = () => {
    if (editedProjectName.trim() === '') {
      setEditedProjectName(project.name);
      setEditingProjectMode(false);
    } else {
      updateProject({
        id: project.id,
        name: editedProjectName
      });
    }
    setEditingProjectMode(false);
  };

  // タスク名入力処理
  const handleInputTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }

  // タスク作成処理
  const handleCreateTask = () => {
    if (taskName.trim() === '' || startDate.trim() === '' || endDate.trim() === '') {
      return;
    }

    addTask({
      id: uuidv4(),
      project_id: project.id,
      name: taskName,
      start_date: startDate,
      end_date: endDate,
      is_completed: false
    });

    onModalClose();
  }

  // タスクの項目が空かどうかでボタンを制御
  useEffect(() => {
    if (taskName.trim() === '' || startDate.trim() === '' || endDate.trim() === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [taskName, startDate, endDate]);


  // タスク作成用モーダルを閉じる処理
  const onModalClose = () => {
    setTaskName('');
    setStartDate(today());
    setEndDate(nextDay());
    onCreateTaskClose();
  }

  return (
    <>
      <Box p={4} bgColor='blackAlpha.300' borderRadius='md' shadow='base'>
        <Flex justify='space-between' align='center' mb={3}>
          {editingProjectMode ? (
            <FormControl>
              <Input ref={inputRef} fontSize='sm' type='text' placeholder='プロジェクト名を入力してください' value={editedProjectName} onBlur={handleUpdateProject} onChange={handleEditedProjectName} />
            </FormControl>
          ) : (
            <Heading fontSize='sm' my={2} onClick={handleEditingProjectMode} noOfLines={1}>{editedProjectName}</Heading>
          )}
          <Popover>
            <PopoverTrigger>
              <DeleteIcon ml={1} color='blackAlpha.200' cursor='pointer' _hover={{ color: 'blackAlpha.500' }} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>このプロジェクトを削除しますか？</PopoverHeader>
              <PopoverBody>
                <Button colorScheme='red' variant='outline' size='sm' onClick={() => deleteProject(project.id)}>削除</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <Box>
          {filteredTasks.length > 0 &&
            <Stack
              mb={4}
              pr={1}
              spacing={4}
              maxHeight="224px"
              overflowY="auto"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                }
              }}
            >
              {filteredTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </Stack>}
          <IconButton size='sm' colorScheme='blackAlpha' w='20px' aria-label="add task" icon={<AddIcon />} shadow='base' onClick={onCreateTaskOpen} />
        </Box>
      </Box>

      <Modal isOpen={isCreateTaskOpen} onClose={onModalClose}>
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
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleCreateTask} isDisabled={isDisabled}>
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