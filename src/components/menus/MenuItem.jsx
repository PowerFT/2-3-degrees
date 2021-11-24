/**
 * External dependencies
 */
import React, { useState } from 'react';
import { Box, Heading, LinkOverlay, LinkBox, VStack } from '@chakra-ui/react';
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

  if (parentId) {
    return <></>;
  } else {
    return (
      <LinkBox
        onClick={onclose}
        display="flex"
        w="100%"
        py="1"
        px="3"
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
        <Box w="full">
          {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
          {menuopen && (
            <Heading
              color="inherit"
              size={mobile ? '2xl' : 'lg'}
              fontSize={mobile ? '40px' : '28px'}
            >
              <LinkOverlay as={Link} to={link}>
                {label}
              </LinkOverlay>
            </Heading>
          )}
        </Box>

        {menuItemHovered && (
          <VStack
            position="absolute"
            right="0"
            top="0"
            spacing="1"
            transform="translateX(100%)"
            bg="dOrange.300"
          >
            {subItems?.map((item) =>
              item ? (
                <LinkBox
                  w="full"
                  // bg="dOrange.300"
                  // border="1px solid black"
                  py="1"
                  px="3"
                  _hover={{ bg: 'whiteAlpha.400' }}
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
      </LinkBox>
    );
  }
};
