import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import React, { FC, useMemo, useState } from 'react'

type Props = {
  headerHeight: string,
  sidebarWidth: string
}

const Sidebar: FC<Props> = ({ headerHeight, sidebarWidth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(true);

  // タスクの項目が空かどうかでボタンを制御
  useMemo(() => {

  }, [])

  return (
    <>
      <Box bgColor="main" display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' position='fixed' top={headerHeight} left='0' bottom='0' w={sidebarWidth}>
        <Stack spacing={5}>
          <Box as='button' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" _hover={{ opacity: '0.7' }} shadow='base'>
            <Image src="/images/team_icons/team_01.jpg" alt="team_01" w='100%' />
          </Box>
          <Box as='button' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" _hover={{ opacity: '0.7' }} shadow='base'>
            <Image src="/images/team_icons/team_02.webp" alt="team_02" w='100%' />
          </Box>
          <Box as="button" w='40px' h='40px' bgColor="gray.500" borderRadius="md" display='flex' justifyContent='center' alignItems='center' _hover={{ opacity: '0.7' }} shadow='base' onClick={onOpen}>
            <AddIcon color="white" />
          </Box>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>チームを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>チーム名</FormLabel>
                <Input type='text' placeholder='チーム名を入力' />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' colorScheme="blue" mr={3} isDisabled={isDisabled}>
              作成
            </Button>
            <Button size='sm' variant="outline" >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Sidebar