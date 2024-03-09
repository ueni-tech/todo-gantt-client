import Header from '@/components/layouts/Header'
import useAuth from '@/hooks/useAuth';
import { userAtom } from '@/state/userAtom';
import { Avatar, Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, WrapItem, Link, Text, Flex, Container, Divider } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React from 'react'


const headerHeight = "3rem";

const Mypage = () => {
  const { isLogin } = useAuth();
  const [user, setUser] = useAtom(userAtom);

  return (
    isLogin ? (
      <>
        <Header headerHeight={headerHeight} />
        <Box mt={headerHeight}>
          <Container maxW='container.md' p={4}>
            <Tabs>
              <TabList>
                <Tab>プロフィール</Tab>
                <Tab>メール</Tab>
                <Tab>セキュリティ</Tab>
                <Tab>サインアウト</Tab>
              </TabList>

              <TabPanels mt={6} pl={8}>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container >
        </Box>
      </>
    ) : null
  )
}

export default Mypage