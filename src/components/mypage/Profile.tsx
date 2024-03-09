import { userAtom } from '@/state/userAtom'
import { Avatar, Divider, Flex, Heading, WrapItem, Link, Box, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'

const Profile = () => {
  const [user, setUser] = useAtom(userAtom)
  return (
    <>
      <Heading as="h3" size="md" mb={4}>プロフィール画像</Heading>
      <Divider w='60%' />
      <Flex alignItems="flex-end">
        <WrapItem w='50%' mt={8}>
          <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        </WrapItem>
        <Link color="teal.500">編集</Link>
      </Flex>
      <Heading as="h3" size="md" mt={12} mb={4}>ユーザー名</Heading>
      <Divider w='60%' />
      <Flex alignItems="flex-end">
        <Box w='50%' mt={8}>
          <Text fontSize='lg'>{user.name}</Text>
        </Box>
        <Link color="teal.500">編集</Link>
      </Flex>
    </>
  )
}

export default Profile