import { AddIcon } from '@chakra-ui/icons'
import { Box, Image, Stack } from '@chakra-ui/react'
import React from 'react'

const Sidebar = () => {
  return (
    <Box bgColor="main" p={4} h="calc(100vh - 56px)">
      <Stack spacing={5}>
        <Box as="button" w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md">
          <Image src="/images/team_icons/team_01.jpg" alt="team_01" />
        </Box>
        <Box as="button" w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md">
          <Image src="/images/team_icons/team_02.webp" alt="team_02" />
        </Box>
        <Box as="button" w='40px' h='40px' bgColor="gray.500" borderRadius="md" display='flex' justifyContent='center' alignItems='center'>
          <AddIcon color="white" />
        </Box>
      </Stack>
    </Box>
  )
}

export default Sidebar