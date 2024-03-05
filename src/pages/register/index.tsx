import AuthHeader from '@/components/layouts/AuthHeader'
import useRegister from '@/hooks/useRegister'
import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputsType } from '../../../types/types'

const Register = () => {
  const { handleSubmit: handleRegisterSubmit } = useRegister();
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  // 入力の項目が空かどうかでボタンを制御
  // useMemo(() => {
  //   setIsDisabled(useIsDisabled(formData.name, formData.email, formData.password, formData.password_confirmation));
  // }, [formData]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    handleRegisterSubmit(data);
  }

  return (
    <Box>
      <AuthHeader />
      <Box mt={20}>
        <Container>
          <Heading textAlign="center" as="h2" fontSize="3xl">アカウント作成</Heading>
          <Box mt={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <VStack spacing={8}>
                  <Box w='100%'>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input variant="filled" type="text" id="name" placeholder="user name" {...register('name')} />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input variant="filled" type="email" id="email" placeholder="email" {...register('email')} />
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード</FormLabel>
                    <Input variant="filled" type="password" id="password" placeholder="password" {...register('password')} />
                    <FormHelperText>※6文字以上の英数字で入力してください。</FormHelperText>
                  </Box>
                  <Box w='100%'>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <Input variant="filled" type="password" id="password_confirmation" placeholder="password(confirm)" {...register('password_confirmation')} />
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