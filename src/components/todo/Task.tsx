import useTasks from '@/hooks/useTasks'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useState } from 'react'

type Props = {
  task: {
    id: string,
    project_id: number,
    name: string,
    start_date: string,
    end_date: string,
    is_completed: boolean
  }
}

const Task: FC<Props> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks('http://localhost:3001/tasks');
  const { isOpen: isUpdateTaskDataOpen, onOpen: onUpdateTaskDataOpen, onClose: onUpdateTaskDataClose } = useDisclosure();
  const [ updateTaskData, setUpdateTaskData ] = useState(task);

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

  return (
    <>
      <Box shadow='base'>
        <Flex p={3} bgColor='white' borderRadius='md' justify='space-between'>
          <Flex justify='center' align='center'>
            <Checkbox mr={2} />
            <Text fontSize='xs' noOfLines={1} >{task.name}</Text>
          </Flex>
          <Flex gap={3}>
            <EditIcon cursor='pointer' color='blackAlpha.300' _hover={{ color: 'blackAlpha.700' }}  onClick={onUpdateTaskDataOpen} />
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
                <Input type='text' placeholder='タスク名' value={updateTaskData.name} onChange={handleUpdateTaskDataNameChange} />
              </FormControl>
              <FormControl>
                <FormLabel>開始日</FormLabel>
                <Input type='date' value={updateTaskData.start_date} onChange={(e)=>setUpdateTaskData({...updateTaskData, start_date: e.target.value})} />
              </FormControl>
              <FormControl>
                <FormLabel>終了日</FormLabel>
                <Input type='date' value={updateTaskData.end_date} onChange={(e)=>setUpdateTaskData({...updateTaskData, end_date: e.target.value})} />
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
}

export default Task