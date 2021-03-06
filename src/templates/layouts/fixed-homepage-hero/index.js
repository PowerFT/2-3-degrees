import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'


export const FixedHomepageHero = ({ button, bgCol, textColour }) => {

  // const imageData = getImage(image.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url

  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Flex 
      as="section" 
      h={{base: "unset", md:"100vh" }}
      minH="90vh"
      bg={bgCol}
      direction="column" 
      position="relative" 
      justify={{base:"space-between", md:"flex-start", xl:"center"}} 
      overflow="hidden"
      px={{ base: '4', md: '12' }}
    >
      <Box
        maxW="3xl"
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        pb={{ base: '0', md: '12' }}
        pt={{ base: '8', md: '12' }}
        // textAlign="center"
        zIndex={30}
        position="relative"
        color="white"
      >
        
        <Heading 
          as="h1" 
          color={textColour} 
          fontSize={{base: '65px', sm: '75px', md:"100px", lg: '120px'}} 
          letterSpacing="tight" 
          textTransform="uppercase"
          maxW={{base:"lg", sm:"md", md:"lg", lg:"2xl"}}
          lineHeight="1"
        >
          <Box as="mark" bg="transparent" color="inherit" fontWeight="100">Are </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="900">you </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="600">ready </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="900">to </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="300">reach </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="100">your </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="900">full </Box> 
          <Box as="mark" bg="transparent" color="inherit" fontWeight="900">potential</Box>
          <Box as="mark" bg="transparent" color="inherit" fontWeight="300">?</Box>
        </Heading>
        
        {/* {text && (
          <Text mt="4" fontSize="lg" color="gray.50">
            {text}
          </Text>
        )} */}
        
        {button && (
          <Button as={Link} textDecoration="none" fontWeight="500" direction="down" to={buttonLink} mt="8" size="lg" rounded="full" bg="dYellow.300" color="gray.800">
            {buttonTitle}
          </Button>
        )}

      </Box>
      
      
      <Box 
        w="65%"
        h="95%"
        pos="absolute"
        bottom="0"
        right="12"
        zIndex="10"
        display={{base:"none", md:"block"}}
        // style={{transform: `translateY(-${offsetY * 0.5}px)`}}
      >
        <StaticImage
          placeholder="none" 
          src="../../../images/cutout2.png" 
          alt="young person smiling"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom right"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>
      <Box 
        w="65%"
        h="95%"
        pos="absolute"
        bottom="0"
        right="16"
        zIndex="5"
        display={{base:"none", md:"block"}}
        style={{transform: `translatex(-${offsetY * 0.01}px)`}}
      >
        <StaticImage
          placeholder="none" 
          src="../../../images/cutout-shadow2.png" 
          alt="shadow"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom right"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>




      <Box 
          pos={{base:"relative", md:"relative"}}
          w={{base:"100%", sm:"80%", md:"65%"}}
          alignSelf={{base:"flex-end", md:"center"}}
          display={{base:"block", md:"none"}}
        >
          <Box 
            w={{base:"100%", md:"auto"}}
            h={{base:"auto", md:"95%"}}
            pos={{base:"relative", md:"absolute"}}
            bottom="0"
            right={{base:"0", md:"12"}}
            zIndex="10"
            // style={{transform: `translateY(-${offsetY * 0.5}px)`}}
          >
            <StaticImage
              placeholder="none" 
              src="../../../images/cutout2.png" 
              alt="young person smiling"
              // height={400}
              fit="cover"
              imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom right"}}
              style={{height:"100%", width:"auto"}}
            />
          </Box>
          <Box 
            w={{base:"100%", md:"auto"}}
            h={{base:"auto", md:"95%"}}
            pos="absolute"
            bottom="0"
            right={{base:"3", md:"16"}}
            zIndex="5"
            style={{transform: `translatex(-${offsetY * 0.01}px)`}}
          >
            <StaticImage
              placeholder="none" 
              src="../../../images/cutout-shadow2.png" 
              alt="shadow"
              // height={400}
              fit="cover"
              imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom right"}}
              style={{height:"100%", width:"auto"}}
            />
          </Box>
        </Box>

      <Box 
          w="45%"
          h="100%"
          pos="absolute"
          bottom="0"
          right="0"
          zIndex="1"
          id="pattern"
          style={{transform: `translateY(${offsetY * .3}px)`}}
          display={{base:"none", md:"block"}}
        >
          <StaticImage
            placeholder="none" 
            src="../../../images/fixedHero.png" 
            alt="shape pattern"
            // height={400}
            fit="cover"
            imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
            style={{height:"100%", width:"auto"}}
          />
        </Box>
        <Box 
          w="100%"
          h={{base: "75%", sm:"85%"}}
          pos="absolute"
          bottom="0"
          right="0"
          zIndex="1"
          id="pattern"
          style={{transform: `translateY(-${offsetY * .3}px)`}}
          display={{base:"block", md:"none"}}
        >
          <StaticImage
            placeholder="none" 
            src="../../../images/fixedHeroPattern.png" 
            alt="shape pattern"
            // height={400}
            fit="cover"
            imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom"}}
            style={{height:"100%", width:"auto"}}
          />
        </Box>
    </Flex>
  )
}