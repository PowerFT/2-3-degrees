import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
// import { HiPlay } from 'react-icons/hi'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const HalfHero = ({ image, title, text, button }) => {

  const imageData = getImage(image.localFile)
  const buttonTitle = button?.title
  const buttonLink = button?.url

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')}>
      <Box
        maxW={{
          base: 'xl',
          md: '7xl',
        }}
        mx="auto"
      // px={{
      //   base: '6',
      //   md: '8',
      // }}
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
          mt="8"
          align={{
            lg: 'center',
          }}
          justify="space-between"
        >
          <Box
            flex="1"
            maxW={{
              lg: '520px',
            }}
            px={{
              base: '6',
              md: '8',
            }}
          >
            <Heading
              as="h1"
              size="3xl"
              color={mode('blue.600', 'blue.300')}
              mt="8"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {title}
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="4" fontSize="lg" fontWeight="medium">
              {text}
            </Text>
            <Button
              as={GatsbyLink}
              to={buttonLink}
              size="lg"
              minW="210px"
              bg="white"
              color="gray.900"
              height="14"
              px="8"
              shadow="base"
              mt="8"
            >
              {buttonTitle}
            </Button>
          </Box>
          <Box
            pos="relative"
            w={{
              base: 'full',
              lg: '560px',
            }}
            h={{
              base: 'auto',
              lg: '560px',
            }}
          >
            <GatsbyImage
              image={imageData}
              alt='tbc'
              pos="relative"
              objectFit="cover"
              loading="lazt"
              // height="100%"
              w="100%"
              h={{
                lg: '100%',
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}