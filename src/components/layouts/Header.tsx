import React from 'react'
import { Avatar, Box, Container, Heading, Text, WrapItem } from '@chakra-ui/react'

const Header = () => {
  return (
    <>
      <Box bgColor="main" py={3}>
        <Container maxW='97%' display="flex" alignItems="center" justifyContent="space-between">
          <Heading as='h1' size='md' color='white'>Todo-Gantt</Heading>
          <Box as='button' display="flex" alignItems="center" gap={2}>
            <WrapItem>
              <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            </WrapItem>
            <Text color='white'>ユーザー名</Text>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Header