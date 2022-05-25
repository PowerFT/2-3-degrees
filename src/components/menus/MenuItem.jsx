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

  const isParent = Boolean(subItems?.length);
  const [menuItemHovered, setMenuItemHovered] = useState(false);

  const handleClick = () => {
    if (!isParent) onclose();
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
          userSelect="none"
          aria-current={isActive ? 'page' : undefined}
          color="gray.50"
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.400' }}
          onMouseEnter={() => setMenuItemHovered(true)}
          onMouseLeave={() => setMenuItemHovered(false)}
          {...rest}
        >
          <Box w="full" py="1" px="3">
            {menuopen && (
              <LinkOverlay
                as={isParent ? 'div' : Link}
                to={isParent ? '' : link}
              >
                <HStack justify="space-between">
                  <Heading
                    color="inherit"
                    size={mobile ? '2xl' : 'lg'}
                    fontSize={mobile ? '40px' : '28px'}
                  >
                    {label}
                  </Heading>

                  {mobile ? (
                    isParent ? (
                      menuItemHovered ? (
                        <Icon as={AiOutlineDown} />
                      ) : (
                        <Icon as={AiOutlineRight} />
                      )
                    ) : (
                      ''
                    )
                  ) : (
                    isParent && <Icon as={AiOutlineRight} />
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
            bg={mobile ? 'whiteAlpha.300' : 'dOrange.300'}
            onMouseEnter={() => setMenuItemHovered(true)}
            onMouseLeave={() => setMenuItemHovered(false)}
          >
            {subItems?.map((item) =>
              item ? (
                <LinkBox
                  key={item.label}
                  w="full"
                  py="1"
                  px="3"
                  w="100%"
                  onClick={onclose}
                  _hover={{ bg: 'whiteAlpha.400' }}
                >
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
