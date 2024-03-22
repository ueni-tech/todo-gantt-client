import { NEXT_PUBLIC_BACKEND_API_URL } from '@/env';
import { userAtom } from '@/state/userAtom';
import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react'

const SignOut = () => {
  const [user] = useAtom(userAtom);
  const [isConfirming, setIsConfirming] = useState(false);

  const onClickSignOutButton = () => {
    setIsConfirming(true);
  }

  const deleteUser = async () => {
    const response = await axios.delete(`${NEXT_PUBLIC_BACKEND_API_URL}/users/${user.id}`);
    if (response.status === 200) {
      alert('アカウントを削除しました');
      window.location.href = '/';
    } else {
      alert('アカウントの削除に失敗しました');
    }
    setIsConfirming(false);
  }

  return (
    <>
      <Heading as="h3" size="md" mb={4}>アカウント削除</Heading>
      <Divider w='60%' />
      <Box mt={8}>
        <Button colorScheme="red" variant='outline' onClick={onClickSignOutButton}>アカウントを削除する</Button>
        {isConfirming && (
          <Box mt={8}>
            <Text fontSize="lg" fontWeight='bold'>本当にアカウントを削除してもよろしいですか？</Text>
            <Text fontSize="sm" color="gray.500" mt={2}>警告：アカウントを削除すると、全てのデータが失われます。</Text>
            <Box mt={8}>
              <Button colorScheme="red" variant='solid' mr={4} onClick={deleteUser}>削除する</Button>
              <Button variant='outline' onClick={() => setIsConfirming(false)}>キャンセル</Button>
            </Box>
          </Box>
        )}
      </Box>
    </>

  )
}

export default SignOut