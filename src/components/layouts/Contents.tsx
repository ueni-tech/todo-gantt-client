import { Box, Container, Flex, HStack, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import TodosView from '../views/TodosView'
import TeamName from '../parts/TeamName'

type Props = {
  headerHeight: string,
  sidebarWidth: string
}

const Contents: FC<Props> = ({ headerHeight, sidebarWidth }) => {
  return (
    <Box p={4} ml={sidebarWidth} minH={`calc(100vh-${headerHeight})`}>
      <TeamName />
      <TodosView />
    </Box>
  )
}

export default Contents