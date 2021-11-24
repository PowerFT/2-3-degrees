import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AccountMenuButton } from './AccountMenuButton';
import { Link as GatsbyLink } from 'gatsby';

import { useAuth } from '../../hooks';

export const AccountMenu = ({ menuopen, ontoggle }) => {
  const { viewer, loadingViewer, logout } = useAuth();

  const [accountLink, setAccountLink] = useState('');

  useEffect(() => {
    if (viewer && !loadingViewer) {
      const user = viewer.roles.nodes[0].name;
      if (user === 'talent') setAccountLink('/talent/account');
      if (user === 'maker') setAccountLink('/maker/account');
    }
  }, [viewer]);

  const handleLogout = () => {
    logout();
  };

  if (loadingViewer || !viewer) return null;

  return (
    <Menu alignSelf="stretch">
      <AccountMenuButton viewer={viewer} menuopen={menuopen} />
      <MenuList shadow="lg" py="4" color="gray.600" px="3">
        <Text fontSize="sm" mb="2">
          {viewer.email}
        </Text>
        <MenuDivider />
        <LinkBox onClick={menuopen ? ontoggle : null}>
          <MenuItem rounded="md">
            <LinkOverlay as={GatsbyLink} to={accountLink}>
              Account Setting
            </LinkOverlay>
          </MenuItem>
        </LinkBox>

        {/* <MenuItem rounded="md">Terms & Conditions</MenuItem> */}
        {/* <MenuItem rounded="md">Account Setting</MenuItem> */}
        <MenuDivider />
        <MenuItem rounded="md" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
