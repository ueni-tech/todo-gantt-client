import React, { FC } from 'react'
import { Avatar, Box, Container, Heading, Text, WrapItem } from '@chakra-ui/react'

type Props = {
  headerHeight: string
}

const Header: FC<Props> = ({headerHeight}) => {
  return (
    <>
      <Box as='header' bgColor="main" h={headerHeight} position='fixed' top='0' left='0' right='0' zIndex="banner">
        <Container maxW='97%' h='100%' display="flex" alignItems="center" justifyContent="space-between">
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