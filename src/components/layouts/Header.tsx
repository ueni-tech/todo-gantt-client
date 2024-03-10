import React, { FC, use } from 'react'
import { Avatar, Box, Button, Container, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Text, WrapItem } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { userAtom } from '@/state/userAtom'
import useLogout from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'

type Props = {
  headerHeight: string
}

const Header: FC<Props> = ({ headerHeight }) => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const { handleLogout } = useLogout();
  return (
    <>
      <Box as='header' bgColor="main" h={headerHeight} position='fixed' top='0' left='0' right='0' zIndex="banner">
        <Container maxW='97%' h='100%' display="flex" alignItems="center" justifyContent="space-between">
          <Heading as='h1' size='md' color='white'>Todo-Gantt</Heading>
          <Menu>
            <MenuButton as='button'>
              <Box display="flex" alignItems="center" gap={2}>
                <WrapItem>
                  <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </WrapItem>
                <Text color='white'>{user.name}</Text>
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=>router.push('/mypage')}>マイページ</MenuItem>
              <MenuItem onClick={handleLogout} color='gray.400' _hover={{color: 'gray.600'}}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        </Container>
      </Box>
    </>
  )
}

export default Header