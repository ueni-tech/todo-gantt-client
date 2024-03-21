import { NEXT_PUBLIC_BACKEND_API_URL } from '@/env';
import useEditUser from '@/hooks/useEditUser';
import { userAtom } from '@/state/userAtom';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Avatar, Divider, Flex, Heading, WrapItem, Link, Text, Box, FormControl, InputGroup, Input, InputRightElement, Button, Icon } from '@chakra-ui/react'
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react'

const Mail = () => {
  const [user] = useAtom(userAtom);
  const { data, updateUser } = useEditUser(`${NEXT_PUBLIC_BACKEND_API_URL}/users/${user.id}`);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleClickEditEmail = () => {
    setIsEditing(true);
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEmail(e.target.value);
  }

  const handleEditSubmit = () => {
    updateUser({ ...data, email: editedEmail });
    setIsEditing(false);
  }

  const handleEditCancel = () => {
    setEditedEmail(data?.email);
    setIsEditing(false);
  }

  return (
    <>
      <Heading as="h3" size="md" mb={4}>メールアドレス</Heading>
      <Divider w='60%' />
      <Flex mt={8} alignItems="flex-end" gap={4}>
        <Box w='50%'>
          {isEditing ?
            <FormControl>
              <InputGroup>
                <Input type='text' ref={inputRef} placeholder='メールアドレス' value={editedEmail} onChange={handleChangeEmail} />
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
            : <Text fontSize='lg'>{data?.email}</Text>}
        </Box>
        {!isEditing && <Link color="teal.500" onClick={handleClickEditEmail}>編集</Link>}
      </Flex>
    </>
  )
}

export default Mail