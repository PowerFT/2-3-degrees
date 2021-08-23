import { Box, Divider, Flex, Icon, Spacer, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFillLightningFill, BsPlug } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'
import { Logo } from './Logo'
import { MenuItem } from '../menus/MenuItem'
// import { SearchField } from './SearchField'
import { AccountMenu } from '../menus/AccountMenu'
import { useAuth } from '../../hooks'
import { PublicMenu } from '../menus/PublicMenu'
import { MakerMenu } from '../menus/MakerMenu'
import { TalentMenu } from '../menus/TalentMenu'


export const Sidebar = (props) => {
  const { isLoggedIn, loadingViewer, viewer } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }



  console.log(viewer)

  return (
    <Flex
      className="sidebar"
      bg='#cef85c'
      direction="column"
      borderRightWidth="1px"
      borderColor="black"
      width={menuOpen ? "64" : "24"}
      transition="all .2s"
      {...props}
    >
      <Flex className="sidebar__content" direction="column" align={menuOpen ? "flex-start" : "center"} flex="1" pt="5" pb="4" overflowY="auto" px="4">
        <Flex id="menuButtons" position="relative" w="100%" h={8} align="center" justifyContent={menuOpen ? "flex-end" : "center"} mb="5">
          {menuOpen ?
            <Icon as={FiX} w={8} h={8} position="absolute" onClick={handleClick} />
            :
            <Icon as={FiMenu} w={8} h={8} position="absolute" onClick={handleClick} />}

        </Flex>

        <Box h="60px" w="60px" mb="5">
          <Logo iconColor='whitesmoke' />
        </Box>

        {/* <Box mb="6">
          <SearchField />
        </Box> */}

        <Stack spacing="6" as="nav" aria-label="Sidebar Navigation" w="100%">



          <Stack spacing="1">


            <MenuItem menuopen={menuOpen} link="/connect-platform" label="Connent Platform" icon={BsFillLightningFill} isActive />
            {/* {!isLoggedIn && (
                <>
                  <MenuItem menuopen={menuOpen} link="/maker" label="Opportunity Maker" icon={BsPlug} />
                  <MenuItem menuopen={menuOpen} link="/talent" label="Young Talent" icon={BsPlug} />
                </>
              )}  */}

            {
              !loadingViewer && viewer && (
                <>
                  {isLoggedIn && viewer.roles.nodes[0].name === "maker" && <MakerMenu menuopen={menuOpen} />}
                  {isLoggedIn && viewer.roles.nodes[0].name === "talent" && <TalentMenu menuopen={menuOpen} />}
                </>
              )
            }
            {
              !isLoggedIn && (
                <>
                  <MenuItem menuopen={menuOpen} link="/maker" label="Opportunity Maker" icon={BsPlug} />
                  <MenuItem menuopen={menuOpen} link="/talent" label="Young Talent" icon={BsPlug} />
                </>
              )
            }


          </Stack>




          {menuOpen && <Divider borderColor="black" />}
          <Stack>
            <PublicMenu menuopen={menuOpen} />
          </Stack>
        </Stack>

        <Spacer />

        {isLoggedIn && <AccountMenu menuopen={menuOpen} />}


      </Flex>

    </Flex>
  )
}