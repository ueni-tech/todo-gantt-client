import { NEXT_PUBLIC_BACKEND_API_URL } from '@/env'
import useTeams from '@/hooks/useTeams'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import React, { FC, useMemo, useState } from 'react'
import { TeamType } from '../../../types/types'

type Props = {
  headerHeight: string,
  sidebarWidth: string
}

const Sidebar: FC<Props> = ({ headerHeight, sidebarWidth }) => {
  const { teams, addTeam } = useTeams(`${NEXT_PUBLIC_BACKEND_API_URL}/teams`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(true);
  const [teamName, setTeamName] = useState('');

  // チーム名の入力時の処理
  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  // チーム作成時の処理
  const hendleCreateTeam = () => {
    if (!teamName.trim()) return;
    const newTeam = {
      name: teamName
    }
    addTeam(newTeam);
    onModalClose();
  }

  // モーダルを閉じる処理
  const onModalClose = () => {
    setTeamName('');
    onClose();
  }

  // タスクの項目が空かどうかでボタンを制御
  useMemo(() => {
    setIsDisabled(!teamName.trim());
  }, [teamName]);

  return (
    <>
      <Box bgColor="main" display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' position='fixed' top={headerHeight} left='0' bottom='0' w={sidebarWidth}>
        <Stack spacing={5}>
          {teams?.map((team: TeamType) => (
            <Box key={team.id} as='button' w='40px' h='40px' border="2px solid #ccc" bgColor="gray.200" borderRadius="md" _hover={{ opacity: '0.7' }} shadow='base'>
              <Image src="/images/team_icons/team_01.jpg" alt="team_01" w='100%' />
            </Box>
          ))}
          <Box as="button" w='40px' h='40px' bgColor="gray.500" borderRadius="md" display='flex' justifyContent='center' alignItems='center' _hover={{ opacity: '0.7' }} shadow='base' onClick={onOpen}>
            <AddIcon color="white" />
          </Box>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <Tabs>
            <TabList>
              <Tab>チームを作成</Tab>
              <Tab>チームに参加</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ModalBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>チーム名</FormLabel>
                      <Input type='text' placeholder='チームを新規作成する' value={teamName} onChange={handleChangeTeamName} />
                    </FormControl>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' colorScheme="blue" mr={3} isDisabled={isDisabled} onClick={hendleCreateTeam}>
                    作成
                  </Button>
                  <Button size='sm' variant="outline" onClick={onModalClose}>
                    キャンセル
                  </Button>
                </ModalFooter>
              </TabPanel>

              <TabPanel>
                <ModalBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>チーム名</FormLabel>
                      <Input type='text' placeholder='チームを探す' />
                    </FormControl>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' colorScheme="blue" mr={3} isDisabled={isDisabled}>
                    検索
                  </Button>
                  <Button size='sm' variant="outline" >
                    キャンセル
                  </Button>
                </ModalFooter>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default Sidebar