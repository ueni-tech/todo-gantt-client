import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import { color } from 'framer-motion'
import React from 'react'

const Todo = () => {
  return (
    <Box shadow='base'>
      <Flex p={3} bgColor='white' borderRadius='md' justify='space-between'>
        <Flex justify='center' align='center'>
          <Checkbox mr={2} />
          <Text fontSize='xs' noOfLines={1} >タスク</Text>
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
              <Button colorScheme='red' variant='outline' size='sm'>削除</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}

export default Todo