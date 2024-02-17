import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import Todo from './Todo'

const Project = () => {
  return (
    <Box p={4} bgColor='blackAlpha.300' borderRadius='md' h='30vh'>
      <Heading fontSize='xs' mb={3}>プロジェクト名</Heading>
      <Stack spacing={3}>
        <Todo />
        <Todo />
      </Stack>
    </Box>
  )
}

export default Project