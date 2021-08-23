/**
* External dependencies
*/
import React from 'react'
import { HStack, Link, useColorModeValue as mode, Text } from '@chakra-ui/react'

import { Link as GatsbyLink } from 'gatsby'
/**
* Internal dependencies
*/

export const MenuItem = (props) => {
  const { icon, isActive, label, link, menuopen, ...rest } = props
  // console.log(isActive, label)
  return (
    <Link as={GatsbyLink}
      to={link}
      display="flex"
      py="2"
      px="3"
      borderRadius="md"
      transition="all 0.2s"
      fontWeight="700"
      fontSize="lg"
      justifyContent={menuopen ? "flex-start" : "center"}
      // textTransform="uppercase"
      // fontFamily="Big Shoulders Display"
      userSelect="none"
      aria-current={isActive ? 'page' : undefined}
      color={mode('gray.900', 'gray.400')}
      _hover={{
        bg: mode('gray.300', 'gray.700'),
        color: mode('gray.900', 'white'),
      }}
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
      <HStack spacing="3">
        {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
        {menuopen && <Text transition="all 3s" as="span">{label}</Text>}
      </HStack>
    </Link>
  )
}
