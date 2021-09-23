import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
// import AniLink from "gatsby-plugin-transition-link/AniLink"


export const FixedTalentHalfHero = ({ image, title, text, button }) => {

  // const imageData = getImage(image.localFile)
  // const buttonTitle = button?.title
  // const buttonLink = button?.url

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
      bg="dOrange.300" 
      direction="column" 
      position="relative" 
      justify="center" 
      overflow="hidden"
      px={{ base: '4', md: '12' }}
    >
      <Box 
        w="65%"
        h="95%"
        pos="absolute"
        bottom="0"
        left="12"
        zIndex="10"
        // style={{transform: `translateY(-${offsetY * 0.5}px)`}}
      >
        <StaticImage 
          src="../../../images/cutout2-flipped.png" 
          alt="young person smiling"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom left"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>
      <Box 
        w="65%"
        h="95%"
        pos="absolute"
        bottom="0"
        left="8"
        zIndex="5"
        // style={{transform: `translatex(-${offsetY * 0.05}px)`}}
      >
        <StaticImage 
          src="../../../images/cutout2-shadow-flipped.png" 
          alt="shadow"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom left"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>

      <Box
        maxW="3xl"
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        py={{ base: '8', sm: '20' }}
        // textAlign="center"
        zIndex={100}
        position="relative"
        alignSelf="flex-end"
        color='gray.50'
      >
        
        <Heading 
          as="h1" 
          fontSize={{base: '50px', sm: '65px', md: '120px'}}  
          lineHeight="1"
          letterSpacing="tight"
          color="inherit"
        >
          I am Talent
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color="inherit">
          Are you ready to take the next step?
        </Text>
        <Button as={Link} to="talent/sign-in" fontWeight="400" cover direction="down" mt="6" size="sm" rounded="full" bg="dYellow.300" color="gray.800" _hover={{bg:"dYellow.200", color:"gray.800"}}>
          Find jobs, internships and apprenticeship now 
        </Button>
      </Box>
    </Flex>
  )
}