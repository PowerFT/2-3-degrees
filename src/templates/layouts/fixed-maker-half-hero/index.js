import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
// import AniLink from "gatsby-plugin-transition-link/AniLink"


export const FixedMakerHalfHero = () => {

  // const [offsetY, setOffsetY] = useState(0)
  // const handleScroll = () => setOffsetY(window.pageYOffset)
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <Flex 
      as="section" 
      h="80vh" 
      bg="dBlue.300" 
      direction="column" 
      position="relative" 
      justify="center" 
      overflow="hidden"
      px={{ base: '4', md: '12' }}
    >
      <Box
        maxW="3xl"
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        py={{ base: '8', sm: '20' }}
        // textAlign="center"
        zIndex={100}
        position="relative"
        alignSelf="flex-start"
        color='gray.50'
        zIndex="10"
      >
        
        <Heading 
          as="h1" 
          fontSize={{base: '50px', sm: '65px', md: '120px'}}  
          lineHeight="1.1"
          letterSpacing="tight"
          color="inherit"
        >
          Opportunity Maker
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color="inherit">
          Hire Diverse Young Talent
        </Text>
        <Button as={Link} to="/maker/sign-in" fontWeight="400" cover direction="down" mt="6" size="sm" rounded="full" bg="dYellow.300" color="gray.800" _hover={{bg:"dYellow.200", color:"gray.800"}}>
          Share your opportunities with tomorrow’s leaders now 
        </Button>
      </Box>
      <Box 
        w="60%"
        h="90%"
        pos="absolute"
        bottom="0"
        right="0"
        zIndex="5"
        top="50%"
        style={{transform: `translateY(-50%`}}
      >
        <StaticImage 
          src="../../../images/pattern-1.png" 
          alt="shadow"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"right"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>
    </Flex>
  )
}