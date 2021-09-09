import * as React from 'react'
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import { HiSpeakerphone, HiLockOpen, HiUserCircle, HiSearchCircle } from 'react-icons/hi'

import { StaticImage } from "gatsby-plugin-image"
import { MySpinner } from '../waiting/MySpinner'
import { useAuth } from '../../hooks'
import { AccountCompletedCard } from './AccountCompleteCard'
import Layout from '../layout/Layout'
import { ConnectJobsTagsBlock } from './ConnectJobTagsBlock'

const FeatureImage = (props) => {
  const maker = props.maker
  return (
    <Box flex="1" overflow="hidden" {...props}>
      <StaticImage
        h="100%"
        w="100%"
        aspectRatio="1"
        src="../../images/testImage3.jpg"
        alt={maker ? "maker image" : "talent image"}
      />
    </Box>
  )
}

const Feature = (props) => {
  const { title, icon, featureLink } = props
  return (
    <Link to={featureLink}>
      <Flex direction="column" bg="dOrange.100" p="5" _hover={{bg: "dOrange.300"}}>
        <Box color="gray.50" fontSize="3rem">
          {icon}
        </Box>
        <Stack mt="4" mx="auto">
          <Text as="h3" color="gray.800" fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </Stack>
      </Flex>
    </Link>
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
  console.log(viewer)

  return (
    <>

      <Box as="section" h="full">
        <Box py="6" w="full" bg="dOrange.300" position="relative" h="40vh" padding="12">
          <Heading 
          color="gray.50"
            size="4xl" 
            key="connectPlatformTitle"
            // initial={{ opacity: 0, y: -400 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -400 }}
            // transition={{duration: 1}}
          >
            Connect <br/> Platform
          </Heading>
          {/* <Text fontSize="3xl" ml="280px" justifySelf="flex-end">{companyName}</Text> */}
          {/* <Avatar size="xl" name={companyName} bottom="0" right="0" position="absolute" m="6"/> */}
        </Box>
        <Box
          maxW={{
            base: 'xl',
            md: '7xl',
          }}
          mx="auto"
        >
          <Flex
            justify="space-between"
            direction={{
              base: 'column',
              lg: 'row',
            }}
            // height="100%"
          >
            <Box
              maxW={{
                lg: 'lg',
              }}
              w={{
                base: 'full',
                lg: '50%',
              }}
            >
              <Box
                // mb={{
                //   lg: '8rem',
                // }}
                px={{
                  base: '6',
                  md: '8',
                }}
                py="24"
              >
                <Heading
                  lineHeight="shorter"
                  size="3xl"
                  letterSpacing="tight"
                  color="gray.800"
                  fontWeight="extrabold"
                >
                  Hey {viewer.firstName} — <br />
                  <Box as="span" color="gray.600">
                    This is your Connect Platform
                  </Box>
                </Heading>
                <Text
                  mt="4"
                  fontSize="2xl"
                  color="dOrange.300"
                  fontWeight="400"
                  maxW={{
                    lg: 'md',
                  }}
                >
                  {maker ? "Connect with talent." : "Find opportunities."}
                </Text>
                <AccountCompletedCard display={completed === limit ? 'none' : 'flex'} completed={completed} limit={limit} mt="4" />
                
                <SimpleGrid
                  flex="1"
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: '2rem', md: '1.5rem' }}
                  mt="4"
                >
                  <Feature  featureLink={maker ? "/maker/jobs/post" : "#"} title="Post an Opportunity" icon={<HiSpeakerphone />} display={talent && "none"} />
                  <Feature featureLink="/connect-platform/jobs" title={maker ? "See the opportunities" : "Search the opportunities"} icon={<HiSearchCircle />} />
                  <Feature featureLink={completed === limit ? "/connect-platform/content" : "#"} title="Access Exclusive Content" icon={<HiLockOpen />} />
                  <Feature featureLink={maker ? "/maker/account" : "/talent/account"} title="Update you account details" icon={<HiUserCircle />} />
                </SimpleGrid>

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
            <Box w="50%" id="imageWrapp">
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
        <ConnectJobsTagsBlock />
      </Box>
    </>
  )
}
