import useTasks from '@/hooks/useTasks'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  task: {
    id: string,
    name: string,
    is_completed: boolean
  }
}

const Task: FC<Props> = ({task}) => {
  const {deleteTask} = useTasks('http://localhost:3001/tasks');

  return (
    <Box shadow='base'>
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
              <Button colorScheme='red' variant='outline' size='sm' onClick={()=>deleteTask(task.id)}>削除</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}

export default Task