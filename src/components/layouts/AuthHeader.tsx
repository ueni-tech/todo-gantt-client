import { Box, Container, Heading } from '@chakra-ui/react'
import React from 'react'

const AuthHeader = () => {
  return (
    <Box as='header' bgColor="main" py={3}>
    <Container maxW='97%' h='100%' display="flex" alignItems="center" justifyContent="space-between">
      <Heading as='h1' size='md' color='white'>Todo-Gantt</Heading>
    </Container>
  </Box>
  )
}

export default AuthHeader