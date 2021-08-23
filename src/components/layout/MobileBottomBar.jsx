/**
* External dependencies
*/
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaRegImages } from 'react-icons/fa'
import {BsFillLightningFill} from 'react-icons/bs'
import * as React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
/**
* Internal dependencies
*/
import { Logo } from './Logo'
import { Sidebar } from './Sidebar'
import { MenuItem } from '../menus/MenuItem'
import { useMobileMenuState } from './useMobileMenuState'
import { useAuth } from '../../hooks'

export const MobileBottomBar = () => {

  const { isOpen, onClose, onOpen } = useMobileMenuState()

  const { isLoggedIn } = useAuth()

  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      bg={mode('gray.50', 'gray.800')}
      display={{
        base: 'flex',
        md: 'none',
      }}
      borderBottomWidth="1px"
    >
      <Logo h="6" iconColor="blue.600" display={isLoggedIn && {base: 'none'}}/>

      <Flex
        justify="space-around"
        grow="1"
      >
        <MenuItem link="/connect-platform" label="Connect" icon={BsFillLightningFill} bg="pink.200"/>
        {isLoggedIn && (
          <>
            <MenuItem link="/maker/jobs" label="Jobs" icon={FaRegImages} bg="pink.200"/>
            <MenuItem link="/maker/account" label="Profile" icon={FaRegImages} bg="pink.200"/>
          </>
        )}
      </Flex>

      

      <IconButton
        onClick={onOpen}
        variant="unstyled"
        display="flex"
        cursor="pointer"
        aria-label="Menu"
        icon={<HiOutlineMenu fontSize="1.5rem" />}
      />
      <Drawer
        size="full"
        placement="right"
        isOpen={isOpen}
        blockScrollOnMount={false}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={mode('white', 'gray.800')} shadow="none" position="relative" maxW={400}>
          <Sidebar width="full" height="full" bg="inherit" border="0" />
          <DrawerCloseButton
            bg="blue.500"
            _hover={{
              bg: 'blue.600',
            }}
            _active={{
              bg: 'blue.700',
            }}
            rounded="0"
            position="absolute"
            color="white"
            right="-8"
            top="0"
          />
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
