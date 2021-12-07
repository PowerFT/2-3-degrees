import {
  Box,
  Collapse,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { AccountMenu } from '../menus/AccountMenu';
import { useAuth } from '../../hooks';
import { NavMenus } from '../menus';
import { Link } from 'gatsby';
import { SocialButton } from '../footer/SocialButton';
import { socialLinks } from '../footer/_data';
import { StaticImage } from 'gatsby-plugin-image';

export const Sidebar = ({ ...rest }) => {
  const { isLoggedIn, loadingViewer, viewer } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  if (loadingViewer) return null;

  return (
    <Flex
      className="site__sidebar"
      bg="dOrange.300"
      direction="column"
      borderRightWidth="1px"
      borderColor="dOrange.100"
      width={isOpen ? '64' : '24'}
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
        align={isOpen ? 'stretch' : 'center'}
        flex="1"
        pt="5"
        pb="4"
        maxH="100%"
        display={
          viewer?.roles?.nodes[0].name === 'waiting' && isLoggedIn
            ? 'none'
            : 'flex'
        }
      >
        <Flex
          id="menuButtons"
          position="relative"
          px="3"
          w="100%"
          h={8}
          align="center"
          justifyContent={isOpen ? 'flex-end' : 'center'}
          mb="5"
        >
          {isOpen ? (
            <Icon
              as={FiX}
              w={8}
              h={8}
              color="gray.50"
              position="absolute"
              onClick={onToggle}
              cursor="pointer"
            />
          ) : (
            <Icon
              as={FiMenu}
              w={8}
              h={8}
              position="absolute"
              onClick={onToggle}
              cursor="pointer"
            />
          )}
        </Flex>

        <LinkBox h="60px" w="60px" mb="5" ml="5" alignSelf="flex-start">
          <LinkOverlay as={Link} to="/" onClick={onToggle}>
            <StaticImage
              src="../../images/oldLogo.png"
              alt="logo"
              // height={400}
              fit="cover"
              imgStyle={{ height: '100%', width: 'auto' }}
              style={{ height: '100%', width: 'auto' }}
            />
          </LinkOverlay>
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
        <Flex
          w={isOpen ? 'max-content' : 'min-content'}
          h={isOpen ? 'min-content' : 'max-content'}
          alignSelf="center"
          mb="5"
          px="3"
          justifySelf="flex-end"
          transition="all 2s"
          flexWrap="wrap"
          as="ul"
        >
          {socialLinks?.map((link, i) => (
            <SocialButton
              key={i}
              target="_blank"
              mb={isOpen ? '0' : '4'}
              mr={isOpen && i !== 3 ? '4' : '0'}
              rel="noreferrer"
              href={link.href}
            >
              <Box srOnly>{link.label}</Box>
              {link.icon}
            </SocialButton>
          ))}
        </Flex>

        {isLoggedIn && (
          <Box px="3" justifySelf="flex-end" alignSelf="stretch">
            <AccountMenu menuopen={isOpen} ontoggle={onToggle} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
