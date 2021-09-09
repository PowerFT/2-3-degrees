/**
* External dependencies
*/
import {
  Box,
  Button,
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
import {Link as GatsbyLink} from 'gatsby'
/**
* Internal dependencies
*/
import { Logo } from './Logo'
import { useAuth } from '../../hooks'
import { NavMenus } from '../menus'

export const MobileBottomBar = () => {

  // const { isOpen, onClose, onOpen } = useMobileMenuState()

  const { isLoggedIn } = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Stack display={['flex', 'none']} position="sticky" bottom="0" id="mobileMenu">
      
        {isLoggedIn ? (
          <HStack bg="dYellow.300" py={2} spacing={2} justify="stretch">
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1" ml="10px">
              <LinkBox textAlign="center">
                <Icon as={RiCreativeCommonsSaFill} w={6} h={6} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/connect-platform">Connect</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1">
              <LinkBox textAlign="center">
                <Icon as={RiBriefcase5Fill} w={6} h={6} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/maker/myjobs">Jobs</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" p={2} flex="1 1">
              <LinkBox textAlign="center">
                <Icon as={RiAccountPinCircleFill} w={6} h={6} />
                <Text fontWeight="bold" fontSize="xs" textTransform="uppercase"><LinkOverlay as={GatsbyLink} to="/maker/account">Account</LinkOverlay></Text>
              </LinkBox>
            </Flex>
            <Flex direction="column" justify="center" align="center" ref={btnRef} onClick={onOpen} w="80px" height="40px" p={2} cursor="pointer">
              <Icon as={FiMenu} w={8} h={8}/>
            </Flex>  
          </HStack>
        ) : (
          <HStack bg="dYellow.300" pl={4} pt="3" pb="2" justify="space-between" align="center">
            <Box h="60px" w="60px">
              <Logo iconColor='whitesmoke' />
            </Box>
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
          <Box h="60px" w="60px" mb="5">
            <Logo iconColor='whitesmoke' />
          </Box>

          <DrawerBody>
            <NavMenus menuopen={true} onclose={onClose}/>
          </DrawerBody>

          <DrawerFooter h="80px">
            <Icon as={FiX} w={8} h={8} position="absolute" onClick={onClose} cursor="pointer"/>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}
