import { Box, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'

const TeamName = () => {
  return (
    <Flex alignItems='center' gap={3}>
      <Box display='flex' alignItems='center' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" shadow='base'>
        <Image src="/images/team_icons/team_01.jpg" alt="team_01" w='100%' />
      </Box>
      <Heading size='md' fontWeight='500'>チーム名</Heading>
    </Flex>
  )
}

export default TeamName