import { Box, Collapse, Flex, Icon, LinkBox, LinkOverlay, Spacer, Stack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Logo } from './Logo'
// import { SearchField } from './SearchField'
import { AccountMenu } from '../menus/AccountMenu'
import { useAuth } from '../../hooks'
import { NavMenus } from '../menus'
// import AniLink from "gatsby-plugin-transition-link/AniLink";
// import InternalProvider from 'gatsby-plugin-transition-link/context/InternalProvider';
import { Link } from 'gatsby'
import { SocialButton } from '../footer/SocialButton'
import { socialLinks } from '../footer/_data'


export const Sidebar = ({...rest}) => {
  const { isLoggedIn, loadingViewer, viewer } = useAuth()
  // console.log(viewer)

  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      className="site__sidebar"
      bg="dOrange.300"
      direction="column"
      borderRightWidth="1px"
      borderColor="dOrange.100"
      width={isOpen ? "64" : "24"}
      transition="all .2s"
      position="sticky"
      top="0"
      alignSelf="flex-start"
      h="100vh"
      zIndex="100"
      flexShrink="0"
      {...rest}
    >
        <Flex 
          className="sidebar__content"
          direction="column"
          align={isOpen ? "stretch" : "center"} 
          flex="1" 
          pt="5" 
          pb="4" 
          maxH="100%"
        >
          
          <Flex id="menuButtons" position="relative" px="3" w="100%" h={8} align="center" justifyContent={isOpen ? "flex-end" : "center"} mb="5">
            {isOpen ?
              <Icon as={FiX} w={8} h={8} position="absolute" onClick={onToggle} cursor="pointer" />
              :
              <Icon as={FiMenu} w={8} h={8} position="absolute" onClick={onToggle} cursor="pointer" />}
          </Flex>

          <LinkBox h="60px" w="100%" mb="5" ml="5" alignSelf="flex-start">
            <LinkOverlay as={Link} to="/" onClick={onToggle}><Logo iconColor='whitesmoke' /></LinkOverlay>
          </LinkBox>

          <Collapse in={isOpen} animateOpacity>
            <NavMenus
              menuopen={isOpen}
              onclose={onToggle}
              viewer={viewer}
              loadingViewer={loadingViewer}
              isLoggedIn={isLoggedIn}
            />
          </Collapse>

          <Spacer />

          {/* <Box> */}
            {/* <Flex spacing={4} w={isOpen ? "max-content" : "min-content"} h={isOpen ? "min-content" : "max-content"} alignSelf="center" mb="5" px="3" justifySelf="flex-end" transition="all 2s" flexWrap="wrap">
              <Icon as={FaFacebook} w={6} h={6} mr={isOpen ? "4" : "0"} mb={isOpen ? "0" : "4"}/>
              <Icon as={FaInstagram} w={6} h={6} mr={isOpen ? "4" : "0"} mb={isOpen ? "0" : "4"}/>
              <Icon as={FaTwitter} w={6} h={6} />
            </Flex> */}
            <Flex w={isOpen ? "max-content" : "min-content"} h={isOpen ? "min-content" : "max-content"} alignSelf="center" mb="5" px="3" justifySelf="flex-end" transition="all 2s" flexWrap="wrap" as="ul">
              {socialLinks?.map((link, i) => (
                <SocialButton key={i} target="_blank" mb={isOpen ? "0" : "4"} mr={isOpen && i !== 3 ? "4" : "0"} rel="noreferrer" href={link.href}>
                  <Box srOnly>{link.label}</Box>
                  {link.icon}
                </SocialButton>
              ))}
            </Flex>

            {isLoggedIn && (
              <Box px="3" justifySelf="flex-end" alignSelf="stretch">
                <AccountMenu menuopen={isOpen} />
              </Box>
            )}
          {/* </Box> */}
          
        </Flex>

      </Flex>
  )
}