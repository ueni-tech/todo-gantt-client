import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Image, Stack } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  headerHeight: string,
  sidebarWidth: string
}

const Sidebar: FC<Props> = ({headerHeight, sidebarWidth}) => {
  return (
    <Box bgColor="main" display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' position='fixed' top={headerHeight} left='0' bottom='0' w={sidebarWidth}>
      <Stack spacing={5}>
        <Box as='button' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" _hover={{opacity: '0.7'}}>
          <Image src="/images/team_icons/team_01.jpg" alt="team_01" w='100%'  />
        </Box>
        <Box as='button' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" _hover={{opacity: '0.7'}}>
          <Image src="/images/team_icons/team_02.webp" alt="team_02" w='100%'  />
        </Box>
        <Box as="button" w='40px' h='40px' bgColor="gray.500" borderRadius="md" display='flex' justifyContent='center' alignItems='center' _hover={{ opacity: '0.7' }}>
          <AddIcon color="white" />
        </Box>
      </Stack>
    </Box>
  )
}

export default Sidebar