import AuthHeader from '@/components/layouts/AuthHeader'
import useRegister from '@/hooks/useRegister'
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputsType } from '../../../types/types'
import { validate } from 'uuid'

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
    getValues
  } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    handleRegisterSubmit(data);
  }

  console.log(errors);

  return (
    <Box>
      <AuthHeader />
      <Box mt={20}>
        <Container>
          <Heading textAlign="center" as="h2" fontSize="3xl">アカウント作成</Heading>
          <Box mt={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={8}>
                <FormControl isInvalid={!!errors.name}>
                  <Box w='100%'>
                    <FormLabel htmlFor='name'>ユーザー名</FormLabel>
                    <Input variant="filled" type="text" id="name" placeholder="user name" {...register('name', {required: "ユーザー名を入力してください。", maxLength: 255})} />
                  </Box>
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <Box w='100%'>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input variant="filled" type="email" id="email" placeholder="email" {...register('email', { required: "メールアドレスを入力してください。", pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} />
                  </Box>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <Box w='100%'>
                    <FormLabel>パスワード</FormLabel>
                    <Input variant="filled" type="password" id="password" placeholder="password" {...register('password', {required: "パスワードを入力してください", minLength: {value: 6, message: "パスワードは6文字以上の英数字で入力してください。"}, max: 255})} />
                    <FormHelperText>※6文字以上の英数字で入力してください。</FormHelperText>
                  </Box>
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password_confirmation}>
                  <Box w='100%'>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <Input variant="filled" type="password" id="password_confirmation" placeholder="password(confirm)" {...register('password_confirmation', {validate: (value)=> value === getValues('password') || "パスワードが一致しません"})} />
                  </Box>
                  <FormErrorMessage>{errors.password_confirmation?.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" display='block' colorScheme="teal" size="lg" w="50%" mt={4} mx='auto'>作成</Button>
              </VStack>
            </form>
          </Box>
        </Container>
      </Box >
    </Box >
  )
}

export default Register