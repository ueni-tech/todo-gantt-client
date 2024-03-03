import AuthHeader from '@/components/layouts/AuthHeader'
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <Box>
      <AuthHeader />
      <Box mt={20}>
        <Container>
          <Heading textAlign="center" as="h2" fontSize="3xl">アカウント作成</Heading>
          <Box mt={8}>
            <form>
              <FormControl>
                <VStack spacing={8}>
                  <Box w='100%'>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input variant="filled" type="text" id="name" name="name" placeholder="user name" />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input variant="filled" type="email" id="email" name="email" placeholder="email" />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード</FormLabel>
                    <Input variant="filled" type="password" id="password" name="password" placeholder="password" />
                    <FormHelperText>※6文字以上の英数字で入力してください。</FormHelperText>
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <Input variant="filled" type="password" id="password_confirmation" name="password_confirmation" placeholder="password(confirm)" />
                  </Box>
                  <Button type="submit" display='block' colorScheme="teal" size="lg" w="50%" mt={4} mx='auto'>作成</Button>
                </VStack>
              </FormControl>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Register