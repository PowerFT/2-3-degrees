import * as React from 'react'
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { StaticImage } from "gatsby-plugin-image"

import { MySpinner } from '../waiting/MySpinner'
import { useAuth } from '../../hooks'
import { AccountCompletedCard } from './AccountCompleteCard'

import { LinkTitle } from './LinkTitle'

const FeatureImage = (props) => {
  const maker = props.maker
  return (
    <Box flex="1" overflow="hidden" {...props}>
      <StaticImage
        h="100%"
        w="100%"
        src="../../images/testImage3.jpg"
        alt={maker ? "maker image" : "talent image"}
      />
    </Box>
  )
}

export const ConnectPlatformHero = () => {

  const { viewer, loadingViewer } = useAuth()




  if (loadingViewer || !viewer) {
    return (
      <MySpinner />
    )
  }

  const accountInputs = [viewer.firstName, viewer.lastName, viewer.nickname, viewer.description, viewer.url]

  console.log(accountInputs)
  const limit = accountInputs.length
  const completed = accountInputs.filter(input => input).length



  const maker = viewer.roles.nodes[0].name === 'maker'
  const talent = viewer.roles.nodes[0].name === 'talent'
  console.log(completed, limit)

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')}>
      <Box
        maxW={{
          base: 'xl',
          md: '7xl',
        }}
        mx="auto"
        height="100%"
      >
        <Flex
          justify="space-between"
          direction={{
            base: 'column',
            lg: 'row',
          }}
          height="100%"

        >
          <Box
            maxW={{
              lg: 'lg',
            }}
            w="50%"
          >
            <Box
              mb={{
                lg: '8rem',
              }}
              px={{
                base: '6',
                md: '8',
              }}
              paddingTop="24"
            >
              <Heading
                lineHeight="shorter"
                size="2xl"
                letterSpacing="tight"
                color={mode('gray.900', 'white')}
                fontWeight="extrabold"
              >
                Hello {viewer.firstName} — <br />
                <Box as="span" color='#4c907f'>
                  Connect Platform
                </Box>
              </Heading>
              <Text
                mt="4"
                fontSize="2xl"
                color={mode('gray.600', 'gray.400')}
                maxW={{
                  lg: 'md',
                }}
              >
                {maker ? "Connect with talent." : "Find opportunities."}
              </Text>
              <AccountCompletedCard display={completed === limit ? 'none' : 'flex'} completed={completed} limit={limit} mt="4" />
              <Stack spacing={2} mt="4">
                {/* <Button as={Link} to="/maker/account" size="md" colorScheme="blue" minH="12" rightIcon={<BiRightArrowAlt />}>
                  Update Profile
                </Button>
                <Button as={Link} to="/maker/jobs/post" colorScheme="green" disabled={completed !== limit} size="md" minH="12" rightIcon={<BiRightArrowAlt />}>
                  Post A Job
                </Button> */}
                <LinkTitle title="Update Profile" link="/maker/account">
                  Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
                </LinkTitle>
                <LinkTitle title="View Jobs Board" link="/connect-platform/jobs">
                  Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
                </LinkTitle>
                <LinkTitle title="Post a Job" link="/maker/jobs/post" completed={completed}>
                  Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
                </LinkTitle>
              </Stack>

            </Box>
            <FeatureImage
              my={{
                base: '14',
                lg: '0',
              }}
              maker={maker}
              display={{
                base: 'block',
                lg: 'none',
              }}
            />
            {/* <SimpleGrid
              flex="1"
              columns={{
                base: 1,
                md: 2,
              }}
              spacing={{
                base: '3rem',
                md: '2rem',
              }}
              px={{
                base: '6',
                md: '8',
              }}
            >
              <Feature title="Order fulfillment" >
                Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
              </Feature>
              <Feature title="Simple Payment" >
                Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
              </Feature>
              <Feature title="Consumer Insight" >
                Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
              </Feature>
              <Feature title="Intuitive Dashboard">
                Sed sit amet velit pharetra, viverra ligula scelerisque, neque.
              </Feature>
            </SimpleGrid> */}
          </Box>
          <Box w="50%" height="100%" id="imageWrapp">
            <FeatureImage
              // maxW={{
              //   lg: '760px',
              // }}
              maker={maker}
              display={{
                base: 'none',
                lg: 'block',
              }}
              h="100%"
            />

          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
