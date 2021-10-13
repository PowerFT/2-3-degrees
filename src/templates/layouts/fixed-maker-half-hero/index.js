import { Box, Button, Flex, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
// import AniLink from "gatsby-plugin-transition-link/AniLink"


export const FixedMakerHalfHero = ({bgCol, textColour}) => {

  // const [offsetY, setOffsetY] = useState(0)
  // const handleScroll = () => setOffsetY(window.pageYOffset)
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <Flex 
      as="section" 
      h={{base: "unset",md:"80vh"}} 
      bg={bgCol} 
      direction="column" 
      position="relative" 
      justify="center" 
      overflow="hidden"
      px={{ base: '4', sm:"12", md: '12' }}
      py={{ base: '4', sm:"12", md: '12' }}
    >
      <Box
        maxW={{md:'lg', lg:"3xl"}}
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        py={{ base: '2', sm: '2' }}
        // textAlign="center"
        zIndex={100}
        position="relative"
        alignSelf="flex-start"
        color={textColour}
        zIndex="10"
      >
        
        <Heading 
          as="h2" 
          fontSize={{base: '70px', sm: '85px', md: '80px', lg: '120px'}}  
          lineHeight="1.1"
          letterSpacing="tight"
          color="inherit"
        >
          Opportunity Maker
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color="inherit">
          Hire Diverse Young Talent
        </Text>
        <LinkBox mt="4">
          <Button 
            size="md" 
            fontWeight="700" 
            rounded="full" 
            bg="dYellow.300"
            color="gray.50" 
            _hover={{bg:"dYellow.200", color:"gray.800"}}
          >
            <LinkOverlay as={Link} to="/maker/sign-in">Share Your Opportunities</LinkOverlay>
          </Button>
        </LinkBox>
        
      </Box>
      <Box 
        w="50%"
        h="105%"
        pos="absolute"
        bottom="0"
        right="0"
        zIndex="5"
        top="50%"
        style={{transform: `translateY(-50%) rotate(90deg)`}}
        display={{base:"none", md:"block"}}
        // transform="rotate(90deg)"
      >
        <StaticImage 
          src="../../../images/fixedHalf.png" 
          alt="young person"
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"right"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>
      <Box 
        w="100%"
        h="auto"
        zIndex="5"
        display={{base:"block", md:"none"}}
      >
        <StaticImage 
          src="../../../images/fixedHalf.png" 
          alt="young person"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"right"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>
    </Flex>
  )
}