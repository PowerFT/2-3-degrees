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
import { BgImage } from '../../../components/BgImage'

export const HalfHero = ({ image, title, text, button, imageSide, bgCol, bgPatternCol, titleColour, subTitleColour, buttonColour }) => {
	const imageData = getImage(image?.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url
  return (
    <Box
      as="section"
      bg={bgCol}
      pb={{base:"12",sm:"24"}}
      pos="relative"
      px={{
        base: '0',
        sm: '6',
        md: '12',
      }}
    >
      
      <Box
        w={{base:"100%", md:"50%"}}
        maxW={{
          md: 'md',
          xl: 'xl',
        }}
        pt={{
          base: '12',
          md: '40',
        }}
        pb={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '6',
          md: '0',
        }}
      >
        <Heading as="h1" size="3xl" lineHeight="1" fontWeight="extrabold" letterSpacing="tight" color={titleColour}>
          {title}
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color={subTitleColour}>
          {text}
        </Text>
        <Button as={GatsbyLink} to={buttonLink} fontWeight="400" cover direction="down" mt="6" size="md" rounded="full" bg="gray.800" color={buttonColour} _hover={{bg:"lighter"}}>
          {buttonTitle}
        </Button>
      </Box>

      <Box
        pos={{
          md: 'absolute',
        }}
        insetY={{
          md: '0',
        }}
        insetEnd={{
          md: '0',
        }}
        bg="gray.50"
        w={{
          base: 'full',
          md: '51%',
        }}
        height={{
          base: '96',
          md: 'full',
        }}
        sx={{
          clipPath: {
            md: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
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
      {bgPatternCol && (
        <BgImage bgPatternCol={bgPatternCol} />
      )}
    </Box>
  )
}