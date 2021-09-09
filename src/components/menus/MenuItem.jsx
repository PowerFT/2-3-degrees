/**
* External dependencies
*/
import React from 'react'
import { HStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/react'
// import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Link } from 'gatsby'
/**
* Internal dependencies
*/

export const MenuItem = (props) => {
  const { icon, isActive, label, link, menuopen, onclose, ...rest } = props
  // console.log(isActive, label)
  return (
    <LinkBox
      onClick={onclose}
      display="flex"
      w="100%"
      py="2"
      px="3"
      transition="all 0.2s"
      fontWeight="700"
      fontSize="lg"
      justifyContent={menuopen ? "flex-start" : "center"}
      // textTransform="uppercase"
      // fontFamily="Big Shoulders Display"
      userSelect="none"
      aria-current={isActive ? 'page' : undefined}
      color='gray.900'
      _hover={{ bg: "whiteAlpha.400" }}
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
      <HStack spacing="3" w="full">
        {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
        {menuopen && <Heading size="lg"><LinkOverlay as={Link} to={link}>{label}</LinkOverlay></Heading>}
      </HStack>
    </LinkBox>
  )
}
