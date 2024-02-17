import { IconButton, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Project from '../todo/Project'
import { AddIcon } from '@chakra-ui/icons'

const TodosView = () => {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
      <Project />
      <Project />
      <IconButton size='sm' bgColor='gray.300' w='20px' aria-label="add project" icon={<AddIcon color='white' />} shadow='base' />
    </SimpleGrid>
  )
}

export default TodosView