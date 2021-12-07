import React from 'react';
import { Box, Divider, Stack, Heading, HStack } from '@chakra-ui/layout';
import { BsFillLightningFill, BsPlug } from 'react-icons/bs';
import { MenuItem } from './MenuItem';
import { PublicMenu } from './PublicMenu';
import { MakerMenu } from './MakerMenu';
import { TalentMenu } from './TalentMenu';
import { useAuth } from '../../hooks';
import Icon from '@chakra-ui/icon';
import { FaSync, FaUserAlt } from 'react-icons/fa';

export const NavMenus = ({ menuopen, mobile, onclose }) => {
  const { logout, isLoggedIn } = useAuth();

  return (
    <Stack spacing="0">
      <MenuItem
        onclose={onclose}
        menuopen={menuopen}
        link="/"
        label="Home"
        icon={BsPlug}
        mobile={mobile}
      />
      {menuopen && <Divider borderColor="dOrange.100" />}
      {!isLoggedIn ? (
        <>
          <MenuItem
            onclose={onclose}
            menuopen={menuopen}
            link="/maker/sign-in"
            label="Employer Login"
            icon={BsPlug}
            mobile={mobile}
          />
          <MenuItem
            onclose={onclose}
            menuopen={menuopen}
            link="/talent/sign-in"
            label="Young Person Login"
            icon={BsPlug}
            mobile={mobile}
          />
        </>
      ) : (
        <>
          <Box pt="2" pl="3" pb="1">
            <Icon as={FaSync} h="25px" w="25px" color="gray.50" />
          </Box>

          <MenuItem
            menuopen={menuopen}
            link="/connect/platform"
            label="Connect Platform"
            icon={BsFillLightningFill}
            isActive
            onclose={onclose}
            mobile={mobile}
          />
          <MenuItem
            menuopen={menuopen}
            link="/connect/jobs"
            label="Opportunity Board"
            icon={BsFillLightningFill}
            isActive
            onclose={onclose}
            mobile={mobile}
          />
          {/* <MenuItem
            menuopen={menuopen}
            link="/connect/blog"
            label="Resources"
            icon={BsFillLightningFill}
            isActive
            onclose={onclose}
            mobile={mobile}
          /> */}
        </>
      )}
      {isLoggedIn && (
        <>
          {menuopen && <Divider borderColor="dOrange.100" />}

          <Box pt="2" pl="3" pb="1">
            <Icon as={FaUserAlt} h="25px" w="25px" color="gray.50" />
          </Box>
        </>
      )}

      <MakerMenu mobile={mobile} onclose={onclose} menuopen={menuopen} />
      <TalentMenu mobile={mobile} onclose={onclose} menuopen={menuopen} />

      {menuopen && <Divider borderColor="dOrange.100" />}

      {!isLoggedIn && (
        <PublicMenu mobile={mobile} onclose={onclose} menuopen={menuopen} />
      )}

      {isLoggedIn && (
        <Box
          // onClick={onclose}
          display="flex"
          w="100%"
          py="1"
          px="3"
          transition="all 0.2s"
          fontWeight="700"
          fontSize="lg"
          justifyContent={menuopen ? 'flex-start' : 'center'}
          // textTransform="uppercase"
          // fontFamily="Big Shoulders Display"
          userSelect="none"
          color="gray.50"
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.400' }}
          onClick={() => logout().then(onclose)}
        >
          <HStack w="full">
            {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
            {menuopen && (
              <Heading
                color="inherit"
                size={mobile ? '2xl' : 'lg'}
                fontSize={mobile ? '40px' : '28px'}
              >
                Logout
              </Heading>
            )}
          </HStack>
        </Box>
      )}
    </Stack>
  );
};
