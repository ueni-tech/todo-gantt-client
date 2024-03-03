import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import { Box, Button, Center, Container, FormControl, FormLabel, Heading, Input, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent, FC, ChangeEvent, useMemo, use } from "react";
import AuthHeader from "@/components/layouts/AuthHeader";
import useLogin from "@/hooks/useLogin";
import useIsDisabled from "@/hooks/useIsDisabled";

const login: FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { formData, handleChange, handleSubmit } = useLogin();
  const router = useRouter();
    // 入力の項目が空かどうかでボタンを制御
    useMemo(() => {
      setIsDisabled(useIsDisabled(formData.email, formData.password));
    }, [formData]);

  return (
    <Box>
      <AuthHeader />
      <Box mt={20}>
        <Container>
          <Heading textAlign="center" as="h2" fontSize="3xl">ログイン</Heading>
          <Box mt={8}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <VStack spacing={8}>
                  <Input variant="filled" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="メールアドレス" />
                  <Input variant="filled" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="パスワード" />
                </VStack>
                <Link display='block' textAlign='right' color="blue.300" mt={1}>パスワードを忘れた方はこちら</Link>
              </FormControl>
              <Button type="submit" display='block' colorScheme="teal" size="lg" w="50%" mt={4} mx='auto' isDisabled={isDisabled}>ログイン</Button>
            </form>
            <Button variant='outline' type="button" display='block' colorScheme="teal" size="lg" w='50%' mt={4} mx='auto'>アカウント作成</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default login;