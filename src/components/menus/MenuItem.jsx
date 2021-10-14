/**
* External dependencies
*/
import React from 'react'
import { HStack, Heading, LinkOverlay, LinkBox } from '@chakra-ui/react'
// import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Link } from 'gatsby'
/**
* Internal dependencies
*/

export const MenuItem = (props) => {
  const { icon, isActive, label, link, menuopen, onclose, mobile, ...rest } = props
  // console.log(isActive, label)
  console.log("mobile? : ",mobile)
  return (
    <LinkBox
      onClick={onclose}
      display="flex"
      w="100%"
      py="1"
      px="3"
      transition="all 0.2s"
      fontWeight="700"
      fontSize="lg"
      justifyContent={menuopen ? "flex-start" : "center"}
      // textTransform="uppercase"
      // fontFamily="Big Shoulders Display"
      userSelect="none"
      aria-current={isActive ? 'page' : undefined}
      color='gray.50'
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
      <HStack w="full">
        {/* <Icon as={BsFillLightningFill} fontSize="2xl" opacity={0.9} /> */}
        {menuopen && 
          <Heading color="inherit" size={mobile ? "2xl" : "lg"} fontSize={mobile ? "40px" : "28px"}>
            <LinkOverlay as={Link} to={link}>{label}</LinkOverlay>
          </Heading>}
      </HStack>
    </LinkBox>
  )
}
