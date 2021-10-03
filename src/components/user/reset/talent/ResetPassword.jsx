import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { ResetPasswordForm } from '../ResetPasswordForm'
import { UnderlineLink } from '../../UnderlineLink'
import { useAuth } from '../../../../hooks'
import { navigate } from 'gatsby'

export const ResetPassword = ({user}) => {

  const { isLoggedIn } = useAuth()
  if(isLoggedIn) navigate("/connect/platform?user=talent")

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      overflow="hidden"
      minH="100vh"
      height="100%"
      bg={mode('gray.50', 'inherit')}
    >
      <Flex align="center" overflowY="auto" flex="1 0 50%" py={{ base: '10', md: '16' }} px={{ base: '6', md: '10' }}>
        <Box maxW="sm" mx="auto">
          {/* <Logo mb={{ base: '7', md: '16' }} w="auto" h="20" mx="auto" iconColor="#FF6A29" /> */}
          <Box textAlign="center" mb={{ base: '5', md: '8' }}>
            <Text as="h1" fontSize="3xl" fontWeight="extrabold" letterSpacing="tight">
              Sign in to your account
            </Text>
            <Text mt="3" color={mode('gray.600', 'gray.400')} fontWeight="medium">
              Need an account? <UnderlineLink link={`/${user}/sign-up`}>Sign up here</UnderlineLink>
            </Text>
          </Box>
          
          <ResetPasswordForm user="talent" />

          <Box textAlign="center" mt={{ base: '3', md: '2' }}>
            <Text mt="3" color={mode('gray.600', 'gray.400')} fontWeight="medium">
              Back to <UnderlineLink link={`/${user}/sign-in`}>Sign-in</UnderlineLink>
            </Text>
          </Box>
        </Box>
      </Flex>

      <Flex
        maxH="100vh"
        overflow="hidden"
        flex="1 0 50%"
        bg="dYellow.100"
        justify="center"
        align="center"
        direction="column"
        p={10}
      >
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Start
        </Heading>
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Making
        </Heading>
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Opportunites
        </Heading>
        <Badge
          mt="6"
          bg="dYellow.300"
          px="5"
          py="1"
          rounded="full"
          letterSpacing="wide"
          color="gray.50"
          fontSize="md"
        >
          Connect
        </Badge>
      </Flex>
    </Flex>
  )
}
