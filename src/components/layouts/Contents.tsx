import { Box, Container, HStack, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { FC } from 'react'
import Project from '../todo/Project'

type Props = {
  sidebarWidth: string
}

const Contents: FC<Props> = ({sidebarWidth}) => {
  return (
    <Box w={`calc(100%-${sidebarWidth})`} bgColor='gray.100' p={8} ml={sidebarWidth}>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </SimpleGrid>
    </Box>
  )
}

export default Contents