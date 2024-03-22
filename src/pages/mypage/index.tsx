import Header from '@/components/layouts/Header'
import Mail from '@/components/mypage/Mail';
import Profile from '@/components/mypage/Profile';
import SignOut from '@/components/mypage/SignOut';
import useAuth from '@/hooks/useAuth';
import { Avatar, Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, WrapItem, Link, Text, Flex, Container, Divider } from '@chakra-ui/react';
import React from 'react'


const headerHeight = "3rem";

const Mypage = () => {
  const { isLogin } = useAuth();

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
                <Tab>アカウント削除</Tab>
              </TabList>

              <TabPanels mt={6} pl={8}>
                <TabPanel>
                  <Profile />
                </TabPanel>
                <TabPanel>
                  <Mail />
                </TabPanel>
                <TabPanel>
                  <SignOut />
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