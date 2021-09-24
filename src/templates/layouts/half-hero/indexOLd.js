import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
// import { HiPlay } from 'react-icons/hi'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const HalfHero = ({ image, title, text, button, imageSide }) => {

  const imageData = getImage(image?.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url
  const side = imageSide === "left" ? 1 : null

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} minH="60vh"
      // minH="xl"
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '3rem',
          lg: '2rem',
        }}
        align={{
          lg: 'center',
        }}
        justify="space-between"
        h="full"
      >
        <Box
          flex="1 0 50%"
          // maxW={{
          //   lg: '520px',
          // }}
          px={{
            base: '6',
            md: '8',
          }}
          py={{
            base: '6',
            md: '10',
          }}
          order="2"
        >
          {title && (
            <Heading
              as="h1"
              size="3xl"
              color="gray.800"
              mt="8"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {title}
            </Heading>
          )}
          {text && (
            <Text color={mode('gray.600', 'gray.400')} mt="4" fontSize="lg" fontWeight="medium">
              {text}
            </Text>
          )}
          {button && (
            <Button as={GatsbyLink} fontWeight="400" cover direction="down" to={buttonLink} mt="8" href="#" size="md" rounded="full" bg="gray.800" color="gray.50">
              {buttonTitle}
            </Button>
          )}
          
        </Box>
        {image && (
          <Flex flex="1 1 50%">
            <GatsbyImage
              className="image"
              image={imageData}
              alt={image?.altText}
            />
          </Flex>
        )}
      </Stack>
    </Box>
  )
}