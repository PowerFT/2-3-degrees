import {
  Box,
  useColorModeValue as mode,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const HalfHero = ({ image, title, text, button, imageSide }) => {
	const imageData = getImage(image?.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url
  return (
    <Box
      as="section"
      bg={mode('gray.50', 'gray.800')}
      pb="24"
      pos="relative"
      px={{
        base: '6',
        lg: '12',
      }}
    >
      <Box maxW="7xl" mx="auto" order="2">
        <Box
          maxW={{
            lg: 'md',
            xl: 'xl',
          }}
          pt={{
            base: '20',
            lg: '40',
          }}
          pb={{
            base: '16',
            lg: '24',
          }}
        >
          <Heading as="h1" size="3xl" lineHeight="1" fontWeight="extrabold" letterSpacing="tight">
						{title}
          </Heading>
          <Text mt={4} fontSize="xl" fontWeight="medium" color={mode('gray.600', 'gray.400')}>
						{text}
          </Text>
					<Button as={GatsbyLink} to={buttonLink} fontWeight="400" cover direction="down" mt="8" size="md" rounded="full" bg="gray.800" color="gray.50">
						{buttonTitle}
					</Button>
        </Box>
      </Box>
      <Box
        pos={{
          lg: 'absolute',
        }}
        insetY={{
          lg: '0',
        }}
        insetEnd={{
          lg: '0',
        }}
        bg="gray.50"
        w={{
          base: 'full',
          lg: '50%',
        }}
        height={{
          base: '96',
          lg: 'full',
        }}
        sx={{
          clipPath: {
            lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
        }}
      >
        {image && (
					<GatsbyImage
						className="image"
						image={imageData}
						alt={image?.altText}
					/>
        )}
      </Box>
    </Box>
  )
}