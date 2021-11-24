/**
 * External dependencies
 */
import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  LinkOverlay,
  LinkBox,
  VStack,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
// import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Link } from 'gatsby';
/**
 * Internal dependencies
 */

export const MenuItem = (props) => {
  const {
    icon,
    isActive,
    label,
    link,
    menuopen,
    onclose,
    mobile,
    subItems,
    parentId,
    ...rest
  } = props;

  const [menuItemHovered, setMenuItemHovered] = useState(false);

  console.log(label, subItems);

  const handleClick = () => {
    if (!subItems) onclose();
    setMenuItemHovered(!menuItemHovered);
  };

  if (parentId) {
    return <></>;
  } else {
    return (
      <Flex pos="relative" direction={mobile ? 'column' : 'row'}>
        <LinkBox
          onClick={handleClick}
          display="flex"
          w="100%"
          position="relative"
          transition="all 0.2s"
          fontWeight="700"
          fontSize="lg"
          justifyContent={menuopen ? 'flex-start' : 'center'}
          // textTransform="uppercase"
          // fontFamily="Big Shoulders Display"
          userSelect="none"
          aria-current={isActive ? 'page' : undefined}
          color="gray.50"
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.400' }}
          onMouseEnter={() => setMenuItemHovered(true)}
          onMouseLeave={() => setMenuItemHovered(false)}
          // _activeLink={{
          //   bg: mode('gray.200', 'gray.700'),
          //   color: 'inherit',
          // }}
          // activeStyle={{
          //   bg: mode('gray.200', 'gray.700'),
          //   color: 'inherit',
          // }}
          // activeStyle={{color: 'lightgray'}}
          {...rest}
        >
          <Box w="full" py="1" px="3">
            {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
            {menuopen && (
              <LinkOverlay
                as={subItems ? 'div' : Link}
                to={subItems ? '' : link}
              >
                <HStack justify="space-between">
                  <Heading
                    color="inherit"
                    size={mobile ? '2xl' : 'lg'}
                    fontSize={mobile ? '40px' : '28px'}
                  >
                    {label}
                  </Heading>
                  {subItems ? (
                    menuItemHovered ? (
                      <Icon as={AiOutlineDown} />
                    ) : (
                      <Icon as={AiOutlineRight} />
                    )
                  ) : (
                    ''
                  )}
                </HStack>
              </LinkOverlay>
            )}
          </Box>
        </LinkBox>
        {menuItemHovered && (
          <VStack
            position={mobile ? 'relative' : 'absolute'}
            right={mobile ? null : '0'}
            top={mobile ? null : '0'}
            spacing="1"
            transform={mobile ? null : 'translateX(100%)'}
            bg="dOrange.300"
            w={mobile ? '100%' : 'unset'}
            color="gray.50"
            bg="whiteAlpha.300"
            onMouseEnter={() => setMenuItemHovered(true)}
            onMouseLeave={() => setMenuItemHovered(false)}
          >
            {subItems?.map((item) =>
              item ? (
                <LinkBox
                  key={item.label}
                  w="full"
                  // bg="dOrange.300"
                  // border="1px solid black"
                  py="1"
                  px="3"
                  w="100%"
                  _hover={{ bg: 'whiteAlpha.400' }}
                  onClick={onclose}
                >
                  {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
                  {menuopen && (
                    <LinkOverlay as={Link} to={item.url}>
                      <Heading
                        color="inherit"
                        size={mobile ? '2xl' : 'lg'}
                        fontSize={mobile ? '40px' : '28px'}
                      >
                        {item.label}
                      </Heading>
                    </LinkOverlay>
                  )}
                </LinkBox>
              ) : (
                <></>
              )
            )}
          </VStack>
        )}
      </Flex>
    );
  }
};
