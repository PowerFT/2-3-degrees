/**
 * External dependencies
 */
import {
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
} from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  RiCreativeCommonsSaFill,
  RiAccountPinCircleFill,
  RiBriefcase5Fill,
} from 'react-icons/ri';
import React, { useState } from 'react';
import { Link as GatsbyLink, Link } from 'gatsby';
/**
 * Internal dependencies
 */
import { useAuth } from '../../hooks';
import { NavMenus } from '../menus';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { StaticImage } from 'gatsby-plugin-image';

export const MobileBottomBar = ({ ...rest }) => {
  // const { isOpen, onClose, onOpen } = useMobileMenuState()

  const { isLoggedIn, viewer } = useAuth();
  const [user, setUser] = useState('');
  const [userJobsLink, setUserJobsLink] = useState('');
  const [userAccountLink, setUserAccountLink] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  React.useEffect(() => {
    if (viewer) setUser(viewer.roles.nodes[0].name);
    if (user === 'talent') setUserJobsLink('/talent/jobs');
    if (user === 'maker') setUserJobsLink('/maker/jobs');
    if (user === 'talent') setUserAccountLink('/talent/account');
    if (user === 'maker') setUserAccountLink('/maker/account');

    // console.log(user, userJobsLink, userAccountLink);
  }, [viewer]);

  return (
    <Stack
      display={['flex', 'none']}
      id="mobileMenu"
      h="8vh"
      bg="dOrange.300"
      justify="center"
      zIndex="4000"
      bottom="0"
      pos="sticky"
      {...rest}
    >
      {isLoggedIn && user !== 'waiting' ? (
        <HStack py={2} spacing={0} justify="stretch" h="100%">
          <Flex
            direction="column"
            justify="center"
            align="center"
            p={2}
            flex="1 0"
          >
            <LinkBox textAlign="center" minW="max-content">
              <Icon as={RiCreativeCommonsSaFill} w={5} h={5} mb={1} />
              <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
                <LinkOverlay as={GatsbyLink} to={'/connect/platform'}>
                  Connect
                </LinkOverlay>
              </Text>
            </LinkBox>
          </Flex>
          <Flex
            direction="column"
            justify="center"
            align="center"
            p={2}
            flex="1 0"
          >
            <LinkBox textAlign="center">
              <Icon as={RiBriefcase5Fill} w={5} h={5} mb={1} />
              <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
                <LinkOverlay as={GatsbyLink} to={userJobsLink}>
                  Jobs
                </LinkOverlay>
              </Text>
            </LinkBox>
          </Flex>
          <Flex
            direction="column"
            justify="center"
            align="center"
            p={2}
            flex="1 0"
          >
            <LinkBox textAlign="center">
              <Icon as={RiAccountPinCircleFill} w={5} h={5} mb={1} />
              <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
                <LinkOverlay as={GatsbyLink} to={userAccountLink}>
                  Account
                </LinkOverlay>
              </Text>
            </LinkBox>
          </Flex>
          {isOpen ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              ref={btnRef}
              onClick={onClose}
              w="80px"
              height="40px"
              p={2}
              cursor="pointer"
            >
              <Icon as={FiX} w={8} h={8} />
            </Flex>
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              ref={btnRef}
              onClick={onOpen}
              w="80px"
              height="40px"
              p={2}
              cursor="pointer"
            >
              <Icon as={FiMenu} w={8} h={8} />
            </Flex>
          )}
        </HStack>
      ) : (
        <HStack bg="dOrange.300" pl={3} justify="space-between" align="center">
          <LinkBox h="50px" w="50px" pt="5px" pb="3px">
            <LinkOverlay as={Link} to="/">
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
          {isOpen ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              ref={btnRef}
              onClick={onClose}
              w="80px"
              height="40px"
              p={2}
              cursor="pointer"
            >
              <Icon as={FiX} w={8} h={8} />
            </Flex>
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              ref={btnRef}
              onClick={onOpen}
              w="80px"
              height="40px"
              p={2}
              cursor="pointer"
            >
              <Icon as={FiMenu} w={8} h={8} />
            </Flex>
          )}
        </HStack>
      )}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
        zIndex="5000"
      >
        <DrawerOverlay />
        <DrawerContent bg="dOrange.300">
          <DrawerBody p="0">
            <LinkBox h="60px" w="60px" mb="5" m="3" onClick={onClose}>
              <LinkOverlay as={GatsbyLink} to="/">
                <StaticImage
                  src="../../images/oldLogo.png"
                  alt="logo"
                  fit="cover"
                  imgStyle={{ height: '100%', width: 'auto' }}
                  style={{ height: '100%', width: 'auto' }}
                />
              </LinkOverlay>
            </LinkBox>
            <NavMenus menuopen={true} onclose={onClose} mobile={true} />
          </DrawerBody>

          <DrawerFooter h="80px" justifyContent="flex-start">
            <HStack justify="space-between" w="100%" align="center">
              <HStack spacing="4">
                <a
                  href="https://www.facebook.com/2.3degrees/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon as={FaFacebook} w={7} h={7} />
                </a>
                <a
                  href="https://www.instagram.com/2_3degrees/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon as={FaInstagram} w={7} h={7} />
                </a>
                <a
                  href="https://twitter.com/2_3degrees?lang=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon as={FaTwitter} w={7} h={7} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC9nxulVkNqGn3XV5UxSEvNQ"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon as={FaYoutube} w={7} h={7} />
                </a>
              </HStack>
              <Icon as={FiX} w={8} h={8} onClick={onClose} cursor="pointer" />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
