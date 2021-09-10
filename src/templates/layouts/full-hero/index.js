import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'
// import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
// import AniLink from "gatsby-plugin-transition-link/AniLink"


export const FullHero = ({ image, title, text, button }) => {

  // const imageData = getImage(image.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url

  return (
    <Flex as="section" h="100vh" bg="dOrange.300" direction="column" position="relative" justify="center" align="center" overflow="hidden">
      <Box
        maxW="3xl"
        // mx="auto"
        px={{ base: '4', lg: '8' }}
        py={{ base: '8', sm: '20' }}
        textAlign="center"
        zIndex={1}
        position="relative"
        color="white"
      >
        <Heading as="h1" color="gray.50" fontSize={{base: '50px', sm: '65px', md: '100px'}} fontWeight="900" letterSpacing="tight">
          {title}
        </Heading>
        {text && (
          <Text mt="4" fontSize="lg" color="gray.50">
            {text}
          </Text>
        )}
        {button && (
          <Button as={Link} textDecoration="none" fontWeight="500" cover direction="down" to={buttonLink} mt="8" size="md" rounded="full" bg="gray.50" color="gray.800">
            {buttonTitle}
          </Button>
        )}
      </Box>
      {/* <Flex
        class="image-wrapper"
        position={{base: "relative", sm: 'absolute'}}
        w="100%"
        h="fit-content"
        overflow="hidden"
        align="center"
        bottom={{sm: 'unset', md: '0'}}
      >
        <StaticImage 
          src="../../../images/hero.png" 
          alt="2-3 Degrees logo pattern"
        />
      </Flex> */}
      
      {/* <Flex
        class="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <GatsbyImage
            image={imageData}
            alt={image.altText}
            objectFit="cover"
            loading="eager"
          />
        </Box>
      </Flex> */}
    </Flex>
  )
}