import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import * as React from 'react'
import { AccountMenuButton } from './AccountMenuButton'

import { useAuth } from '../../hooks'

export const AccountMenu = ({ menuopen }) => {

  const { viewer, loadingViewer, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  if(loadingViewer || !viewer) return null

  return (
    <Menu alignSelf="stretch">
      <AccountMenuButton
        viewer={viewer}
        menuopen={menuopen}
      />
      <MenuList shadow="lg" py="4" color='gray.600' px="3" >
        <Text fontSize="sm" mb="2">
          {viewer.email}
        </Text>
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
  )
}