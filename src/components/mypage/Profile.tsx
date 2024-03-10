import { userAtom } from '@/state/userAtom'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Avatar, Divider, Flex, Heading, WrapItem, Link, Box, Text, Input, InputGroup, InputRightElement, Button, Icon, FormControl } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'

const Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(user.name);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);


  const handleClickEditUserName = () => {
    setIsEditing(true);
  }

  const handleEditSubmit = () => {
    setIsEditing(false);
  }

  const handleEditCancel = () => {
    setEditedUserName(user.name);
    setIsEditing(false);
  }

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserName(e.target.value);
  }

  return (
    <>
      <Heading as="h3" size="md" mb={4}>プロフィール画像</Heading>
      <Divider w='60%' />
      <Flex alignItems="flex-end" gap={4}>
        <WrapItem w='50%' mt={8}>
          <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        </WrapItem>
        <Link color="teal.500">編集</Link>
      </Flex>
      <Heading as="h3" size="md" mt={12} mb={4}>ユーザー名</Heading>
      <Divider w='60%' />
      <Flex mt={8} alignItems="center" gap={4}>
        <Box w='50%'>
          {isEditing ?
            <FormControl>
              <InputGroup>
                <Input type='text' ref={inputRef} onBlur={handleEditCancel} placeholder='ユーザー名' value={editedUserName} onChange={handleChangeUserName} />
                <InputRightElement right={3}>
                  <Flex>
                    <Button variant="ghost" size='xs' onClick={handleEditSubmit}>
                      <Icon as={CheckIcon} color="gray.500" />
                    </Button>
                    <Button variant="ghost" size='xs' onClick={handleEditCancel}>
                      <Icon as={CloseIcon} color="gray.500" />
                    </Button>
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            : <Text fontSize='lg'>{user.name}</Text>}
        </Box>
        {!isEditing && <Link color="teal.500" onClick={handleClickEditUserName}>編集</Link>}
      </Flex>
    </>
  )
}

export default Profile