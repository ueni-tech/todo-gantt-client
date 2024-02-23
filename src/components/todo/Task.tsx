import useTasks from '@/hooks/useTasks'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  task: {
    id: string,
    name: string,
    is_completed: boolean
  }
}

const Task: FC<Props> = ({ task }) => {
  const { deleteTask } = useTasks('http://localhost:3001/tasks');
  const { isOpen: isUpdateTaskOpen, onOpen: onUpdateTaskOpen, onClose: onUpdateTaskClose } = useDisclosure();

  // タスク編集処理
  const handleUpdateTask = () => { }

  // タスク編集用モーダルを閉じる処理
  const onUpdateTaskModalClose = () => {
    onUpdateTaskClose();
  }

  return (
    <>
      <Box shadow='base' onClick={onUpdateTaskOpen} cursor='pointer' _hover={{ opacity: 0.8 }}>
        <Flex p={3} bgColor='white' borderRadius='md' justify='space-between'>
          <Flex justify='center' align='center'>
            <Checkbox mr={2} />
            <Text fontSize='xs' noOfLines={1} >{task.name}</Text>
          </Flex>
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
      </Box>

      <Modal isOpen={isUpdateTaskOpen} onClose={onUpdateTaskClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを編集</ModalHeader>
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
            <Button size='sm' colorScheme="blue" mr={3} onClick={handleUpdateTask}>
              編集
            </Button>
            <Button size='sm' variant="outline" onClick={onUpdateTaskModalClose} >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Task