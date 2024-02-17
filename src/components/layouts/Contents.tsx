import { Box, Container, HStack, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { FC } from 'react'
import TodosView from '../views/TodosView'

type Props = {
  headerHeight: string,
  sidebarWidth: string
}

const Contents: FC<Props> = ({headerHeight, sidebarWidth}) => {
  return (
    <Box p={8} ml={sidebarWidth} minH={`calc(100vh-${headerHeight})`}>
      <TodosView />
    </Box>
  )
}

export default Contents