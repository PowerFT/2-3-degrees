import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'


export const FullHero = ({ image, title, text, button }) => {

  const imageData = getImage(image.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url

  return (
    <Box as="section" bg="gray.800" minH="140px" position="relative">
      <Box
        maxW="2xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '16', sm: '20' }}
        textAlign="center"
        zIndex={1}
        position="relative"
        color="white"
      >
        <Heading as="h2" size="3xl" fontWeight="extrabold" letterSpacing="tight">
          {title}
        </Heading>
        <Text mt="4" fontSize="lg">
          {text}
        </Text>
        <Button as={Link} to={buttonLink} mt="8" href="#" size="lg" colorScheme="blue" fontWeight="bold">
          {buttonTitle}
        </Button>
      </Box>
      <Flex
        id="image-wrapper"
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
            alt={'tbc'}
            objectFit="cover"
            loading="eager"
            height="100%"
            width="100%"
          />
          {/* <Img
            src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
            alt="Main Image"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="top bottom"
            position="absolute"
          /> */}
          <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
        </Box>
      </Flex>
    </Box>
  )
}


// export const query = graphql`
//   fragment FullHeroFragment on WpPage_Pagebuilder_Layouts_FullHero {
//       fieldGroupName
//       image {
//         localFile {
//           childImageSharp {
//             gatsbyImageData(quality: 90, placeholder: DOMINANT_COLOR)
//             fluid(quality: 90, cropFocus: CENTER) {
//               src
//               srcSet
//               aspectRatio
//             }
//           }
//         }
//       }
//       textColour
//       text
//     }
//   }
// `