import AuthHeader from '@/components/layouts/AuthHeader'
import useIsDisabled from '@/hooks/useIsDisabled'
import useRegister from '@/hooks/useRegister'
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

const Register = () => {
  const { formData, handleChange, handleSubmit } = useRegister();
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  // 入力の項目が空かどうかでボタンを制御
  useMemo(() => {
    setIsDisabled(useIsDisabled(formData.name, formData.email, formData.password, formData.password_confirmation));
  }, [formData]);

  return (
    <Box>
      <AuthHeader />
      <Box mt={20}>
        <Container>
          <Heading textAlign="center" as="h2" fontSize="3xl">アカウント作成</Heading>
          <Box mt={8}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <VStack spacing={8}>
                  <Box w='100%'>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input variant="filled" type="text" id="name" name="name" placeholder="user name" value={formData.name} onChange={handleChange} />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input variant="filled" type="email" id="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード</FormLabel>
                    <Input variant="filled" type="password" id="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                    <FormHelperText>※6文字以上の英数字で入力してください。</FormHelperText>
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <Input variant="filled" type="password" id="password_confirmation" name="password_confirmation" placeholder="password(confirm)" value={formData.password_confirmation} onChange={handleChange} />
                  </Box>
                  <Button type="submit" display='block' colorScheme="teal" size="lg" w="50%" mt={4} mx='auto' isDisabled={isDisabled}>作成</Button>
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