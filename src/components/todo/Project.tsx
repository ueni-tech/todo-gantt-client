import { Box, Button, Flex, FormControl, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack } from '@chakra-ui/react'
import React, { FC, useEffect, useRef, useState } from 'react'
import Todo from './Todo'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

type Props = {
  project: {
    id: number,
    name: string,
  }
}

const Project: FC<Props> = ({project}) => {
  const [editingProjectMode, setEditingProjectMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const [editStartProjectName, setEditStartProjectName] = useState(``);
  
  const inputRef = useRef<HTMLInputElement>(null);
  //プロジェクト名編集モードになったらInputにfocusを当てる
  useEffect(() => {
    if (editingProjectMode) {
      inputRef.current?.focus();
    }
  }, [editingProjectMode]);

  // プロジェクト名編集モードの切り替え処理
  const handleEditingProjectMode = () => {
    setEditingProjectMode(!editingProjectMode);

    if (editingProjectMode){
      setEditStartProjectName(editedProjectName);
    }

    if (editedProjectName.trim() === '') {
      setEditedProjectName(editStartProjectName);
    }
  }

  // プロジェクト名編集処理
  const handleEditedProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProjectName(e.target.value);
  }

  return (
    <Box p={4} bgColor='blackAlpha.300' borderRadius='md' shadow='base'>
      <Flex justify='space-between' align='center' mb={3}>
        {editingProjectMode ? (
          <FormControl>
            <Input ref={inputRef} fontSize='xs' type='text' placeholder='プロジェクト名を入力してください' value={editedProjectName} onBlur={handleEditingProjectMode} onChange={handleEditedProjectName} />
          </FormControl>
        ) : (
          <Heading fontSize='xs' onClick={handleEditingProjectMode} py={3}>{editedProjectName}</Heading>
        )}
        <Popover>
          <PopoverTrigger>
            <DeleteIcon color='blackAlpha.200' cursor='pointer' _hover={{ color: 'blackAlpha.500' }} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>このプロジェクトを削除しますか？</PopoverHeader>
            <PopoverBody>
              <Button colorScheme='red' variant='outline' size='sm'>削除</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Stack spacing={4}>
        <Todo />
        <Todo />
        <IconButton size='sm' colorScheme='blackAlpha' w='20px' aria-label="add todo" icon={<AddIcon />} shadow='base' />
      </Stack>
    </Box>
  )
}

export default Project