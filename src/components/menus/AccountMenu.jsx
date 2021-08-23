import {
  Menu,
  MenuDivider,
  MenuItem,
  // MenuItemOption,
  MenuList,
  // MenuOptionGroup,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
// import {FaRegMoon, FaRegSun} from 'react-icons/fa'
import * as React from 'react'
import { AccountMenuButton } from './AccountMenuButton'

import { useAuth } from '../../hooks'
// import { MySpinner } from '../waiting/MySpinner'

export const AccountMenu = ({ menuopen }) => {

  const { viewer, loadingViewer, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  if (loadingViewer || !viewer) {
    return (
      <p>loading</p>
    )
  }

  return (
    // <Loading isLoading={loadingViewer}>
    <Menu>
      <AccountMenuButton
        viewer={viewer}
        menuopen={menuopen}
      />
      <MenuList shadow="lg" py="4" color='gray.600' px="3" >
        <Text fontSize="sm" mb="2">
          {viewer.email}
        </Text>
        {/* <MenuOptionGroup defaultValue="chakra-ui">
            <MenuItemOption value="chakra-ui" fontWeight="semibold" rounded="md">
              <HStack spacing="4">
                <Text as="span">Light Mode</Text>
                <Icon as={FaRegSun} fontSize="xl" opacity={0.64} />
              </HStack>
            </MenuItemOption>
            <MenuItemOption value="careerlyft" fontWeight="semibold" rounded="md">
              <HStack spacing="4">
                <Text as="span">Dark Mode</Text>
                <Icon as={FaRegMoon} fontSize="xl" opacity={0.64} />
              </HStack>
            </MenuItemOption>
          </MenuOptionGroup> */}
        <MenuDivider />
        <LinkBox>
          <MenuItem rounded="md"><LinkOverlay href="/maker/account">Account Setting</LinkOverlay></MenuItem>
        </LinkBox>

        <MenuItem rounded="md">Terms & Conditions</MenuItem>
        <MenuItem rounded="md">Account Setting</MenuItem>
        <MenuDivider />
        <MenuItem
          rounded="md"
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
    // </Loading>

  )
}