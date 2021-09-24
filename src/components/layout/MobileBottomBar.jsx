/**
* External dependencies
*/
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Icon,
  // useColorModeValue as mode,
  useDisclosure,
  Text,
  HStack,
  LinkOverlay,
  LinkBox,
  Stack,
} from '@chakra-ui/react'
import { FiMenu, FiX } from 'react-icons/fi'
import { RiCreativeCommonsSaFill, RiAccountPinCircleFill, RiBriefcase5Fill } from 'react-icons/ri'
import * as React from 'react'
import {Link as GatsbyLink, Link} from 'gatsby'
/**
* Internal dependencies
*/
import { Logo } from './Logo'
import { useAuth } from '../../hooks'
import { NavMenus } from '../menus'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export const MobileBottomBar = () => {

  // const { isOpen, onClose, onOpen } = useMobileMenuState()

  const { isLoggedIn } = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Stack 
      display={['flex', 'none']} 
      position="sticky" 
      bottom="0" 
      id="mobileMenu" 
      h="8vh"
      bg="dYellow.300"
      justify="center"
      zIndex="1000"
    >
        {isLoggedIn ? (
          <HStack py={2} spacing={0} justify="stretch" h="100%">
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1">
              <LinkBox textAlign="center">
                <Icon as={RiCreativeCommonsSaFill} w={5} h={5} mb={1} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/connect/platform">Connect</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1">
              <LinkBox textAlign="center">
                <Icon as={RiBriefcase5Fill} w={5} h={5} mb={1} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/maker/jobs">Jobs</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1">
              <LinkBox textAlign="center">
                <Icon as={RiAccountPinCircleFill} w={5} h={5} mb={1} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/maker/account">Account</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" ref={btnRef} onClick={onOpen} w="80px" height="40px" p={2} cursor="pointer">
              <Icon as={FiMenu} w={8} h={8}/>
            </Flex>  
          </HStack>
        ) : (
          <HStack bg="dYellow.300" pl={3} justify="space-between" align="center">
            <LinkBox h="50px" w="50px">
              <LinkOverlay as={Link} to="/"><Logo iconColor='whitesmoke' /></LinkOverlay>
            </LinkBox>
            <Flex direction="column" justify="center" align="center" ref={btnRef} onClick={onOpen} w="80px" height="40px" p={2} cursor="pointer">
              <Icon as={FiMenu} w={8} h={8}/>
            </Flex>  
          </HStack>
        )}
        
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
        
      >
        <DrawerOverlay />
        <DrawerContent bg="dYellow.300">
          {/* <DrawerHeader></DrawerHeader> */}
          

          <DrawerBody p="0">
            <LinkBox h="60px" w="60px" mb="5" m="3" onClick={onClose}>
              <LinkOverlay as={GatsbyLink} to="/"><Logo iconColor='whitesmoke' /></LinkOverlay>
            </LinkBox>
            <NavMenus menuopen={true} onclose={onClose} mobile={true}/>
          </DrawerBody>

          <DrawerFooter h="80px" justifyContent="flex-start">
            <HStack justify="space-between" w="100%" align="center">
              <HStack spacing="4">
                <a href="https://www.facebook.com/2.3degrees/" target="_blank" rel="noreferrer">
                  <Icon as={FaFacebook} w={7} h={7}/>
                </a>
                <a href="https://www.instagram.com/2_3degrees/" target="_blank" rel="noreferrer">
                  <Icon as={FaInstagram} w={7} h={7}/>
                </a> 
                <a href="https://twitter.com/2_3degrees?lang=en" target="_blank" rel="noreferrer">
                  <Icon as={FaTwitter} w={7} h={7}/>
                </a>
                <a href="https://www.youtube.com/channel/UC9nxulVkNqGn3XV5UxSEvNQ" target="_blank" rel="noreferrer">
                  <Icon as={FaYoutube} w={7} h={7} />
                </a>
                
              </HStack>
              <Icon 
                as={FiX} 
                w={8} 
                h={8} 
                onClick={onClose} 
                cursor="pointer"
              />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}
