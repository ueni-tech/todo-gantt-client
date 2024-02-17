import { Box, Button, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack } from '@chakra-ui/react'
import React from 'react'
import Todo from './Todo'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

const Project = () => {
  return (
    <Box p={4} bgColor='blackAlpha.300' borderRadius='md' h='30vh' shadow='base'>
      <Flex justify='space-between' align='center' mb={3}>
        <Heading fontSize='xs'>プロジェクト名</Heading>
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
      <Stack spacing={3}>
        <Todo />
        <Todo />
        <IconButton size='sm' colorScheme='blackAlpha' w='20px' aria-label="add todo" icon={<AddIcon />} shadow='base' />
      </Stack>
    </Box>
  )
}

export default Project