import useTasks from '@/hooks/useTasks'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { ChangeEvent, FC, memo, useState } from 'react'
import { NEXT_PUBLIC_BACKEND_API_URL } from '@/env'
import { TaskType } from '../../../types/types'

type Props = {
  task: TaskType
}

const Task: FC<Props> = memo(({ task }) => {
  const { deleteTask, updateTask } = useTasks(`${NEXT_PUBLIC_BACKEND_API_URL}/tasks`);
  const { isOpen: isUpdateTaskDataOpen, onOpen: onUpdateTaskDataOpen, onClose: onUpdateTaskDataClose } = useDisclosure();
  const [updateTaskData, setUpdateTaskData] = useState(task);

  // タスク名変更処理
  const handleUpdateTaskDataNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTaskData({ ...updateTaskData, name: e.target.value });
  }

  // タスク編集処理
  const handleUpdateTaskData = () => {
    updateTask(updateTaskData);
    onUpdateTaskDataClose();
  }

  // タスク編集用モーダルを閉じる処理
  const onUpdateTaskDataModalClose = () => {
    setUpdateTaskData(task);
    onUpdateTaskDataClose();
  }

  // チェックボックスクリック時の処理
  const handleChangeCheckBox = () => {
    const newTask = {
      ...task,
      is_completed: !task.is_completed
    }
    updateTask(newTask);
  }

  return (
    <>
      <Box shadow='base'>
        <Flex p={3} bgColor='white' borderRadius='md' justify='space-between'>
          <Flex justify='center' align='center' overflow='hidden'>
            <Checkbox mr={2} onChange={handleChangeCheckBox} />
            {task.is_completed ?
              <Text fontSize='xs' noOfLines={1} color='gray.500' textDecoration='line-through'>{task.name}</Text>
              :
              <Text fontSize='xs' noOfLines={1}>{task.name}</Text>}
          </Flex>
          <Flex ml={1} gap={3}>
            <EditIcon cursor='pointer' color='blackAlpha.300' _hover={{ color: 'blackAlpha.700' }} onClick={onUpdateTaskDataOpen} />
            <Popover>
              <PopoverTrigger>
                <DeleteIcon color='red.100' cursor='pointer' _hover={{ color: 'red.500' }} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>このタスクを削除しますか？</PopoverHeader>
                <PopoverBody>
                  <Button colorScheme='red' variant='outline' size='sm' onClick={() => deleteTask(task.id)}>削除</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isUpdateTaskDataOpen} onClose={onUpdateTaskDataModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>タスク名</FormLabel>
                <Input type='text' placeholder='タスク名を入力' value={updateTaskData.name} onChange={handleUpdateTaskDataNameChange} />
              </FormControl>
              <FormControl>
                <FormLabel>開始日</FormLabel>
                <Input type='date' value={updateTaskData.start_date} onChange={(e) => setUpdateTaskData({ ...updateTaskData, start_date: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>終了日</FormLabel>
                <Input type='date' value={updateTaskData.end_date} onChange={(e) => setUpdateTaskData({ ...updateTaskData, end_date: e.target.value })} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleUpdateTaskData}>
              編集
            </Button>
            <Button size='sm' variant="outline" onClick={onUpdateTaskDataModalClose} >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
});

export default Task