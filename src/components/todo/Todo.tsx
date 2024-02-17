import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

const Todo = () => {
  return (
    <Box>
      <Box p={3} bgColor='orange.50' borderRadius='md'>
        <Text fontSize='xs'>タスク</Text>
      </Box>
    </Box>
  )
}

export default Todo