import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { SigninForm } from '../SigninForm'
import { UnderlineLink } from '../../UnderlineLink'
import { useAuth } from '../../../../hooks'
import { navigate } from 'gatsby'
import { useAuthContext } from '../../../../context';

export const SignIn = () => {
  const { isLoggedIn } = useAuthContext();
  // const { isLoggedIn } = useAuth()
  console.log(isLoggedIn)
  if(isLoggedIn) navigate("/connect/platform?user=maker")

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
          <Box textAlign="center" mb={{ base: '5', md: '8' }}>
            <Text as="h1" fontSize="3xl" fontWeight="extrabold" letterSpacing="tight">
              Login to your account
            </Text>
            <Text mt="3" color={mode('gray.600', 'gray.400')} fontWeight="medium">
              Need an account? <UnderlineLink link='/maker/sign-up'>Sign up here</UnderlineLink>
            </Text>
          </Box>
          <SigninForm user="maker" />

          <Box textAlign="center" mt={{ base: '3', md: '2' }}>
            <Text mt="3" color={mode('gray.600', 'gray.400')} fontWeight="medium">
              Need to reset? <UnderlineLink link="/reset">Reset Password</UnderlineLink>
            </Text>
          </Box>
        </Box>
      </Flex>

      <Flex
        maxH="100vh"
        overflow="hidden"
        flex="1 0 50%"
        bg="dBlue.300"
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
          bg="dOrange.300"
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
