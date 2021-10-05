import { Box, Button, Flex, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
// import AniLink from "gatsby-plugin-transition-link/AniLink"


export const FixedTalentHalfHero = ({ bgCol, textColour }) => {

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
      h={{base: "unset",md:"80vh"}}
      bg={bgCol}
      direction="column" 
      position="relative" 
      justify="center" 
      overflow="hidden"
      px={{ base: '4', sm:"12", md: '12' }}
      pt={{ base: '4', sm:"12", md: '12' }}
    >
      <Box 
        w="65%"
        h="95%"
        pos="absolute"
        bottom="0"
        left="12"
        zIndex="10"
        display={{base:"none", md:"block"}}
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
        display={{base:"none", md:"block"}}
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
        maxW="2xl"
        w={{base:"100%", md:"fit-content"}}
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        py={{ base: '0', sm: '2' }}
        // textAlign="center"
        zIndex={100}
        position="relative"
        alignSelf="flex-end"
        color={textColour}
      >
        
        <Heading 
          as="h2" 
          fontSize={{base: '70px', sm: '85px', md: '120px'}}  
          lineHeight="1"
          letterSpacing="tight"
          color="inherit"
        >
          I am Talent
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color="inherit" maxW="md">
          Are you ready to take the next step? Find jobs, internships and apprenticeship, now.
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
            <LinkOverlay as={Link} to="/talent/sign-in">Find Opportunities</LinkOverlay>
          </Button>
        </LinkBox>
      </Box>
      <Box pos="relative" display={{base:"block", md:"none"}} w="80%" alignSelf="flex-end">
        <Box 
          w="100%"
          h="auto"
          pos="relative"
          zIndex="10"
          // style={{transform: `translateY(-${offsetY * 0.5}px)`}}
        >
          <StaticImage 
            src="../../../images/cutout2-flipped.png" 
            alt="young person smiling"
            // height={400}
            fit="cover"
            imgStyle={{height:"100%"}}
            style={{height:"auto", width:"100%"}}
          />
        </Box>
        <Box 
          w="100%"
          h="auto"
          pos="absolute"
          bottom="0"
          left="4"
          zIndex="5"
          // style={{transform: `translatex(-${offsetY * 0.05}px)`}}
        >
          <StaticImage 
            src="../../../images/cutout2-shadow-flipped.png" 
            alt="shadow"
            // height={400}
            fit="cover"
            imgStyle={{height:"100%"}}
            style={{height:"auto", width:"100%"}}
          />
        </Box>
      </Box>
    </Flex>
  )
}