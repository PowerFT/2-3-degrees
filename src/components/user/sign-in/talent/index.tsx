import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Logo } from '../../../layout/Logo';
import { SigninForm } from '../SigninForm';
import { UnderlineLink } from '../../UnderlineLink';
import { useAuth } from '../../../../hooks';
import { navigate } from 'gatsby';

export const SignIn = () => {
  const { isLoggedIn } = useAuth();
  // if (isLoggedIn) navigate('/connect/platform?user=talent');
  if (isLoggedIn) navigate('/talent/account');

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      overflow="hidden"
      minH="100vh"
      height="100%"
      bg={mode('gray.50', 'inherit')}
    >
      <Flex
        align="center"
        overflowY="auto"
        flex="1 0 50%"
        py={{ base: '10', md: '16' }}
        px={{ base: '6', md: '10' }}
      >
        <Box
          overflowY="auto"
          flex="1"
          py={{ base: '10', md: '16' }}
          px={{ base: '6', md: '10' }}
        >
          <Box maxW="sm" mx="auto">
            <Box textAlign="center" mb={{ base: '10', md: '16' }}>
              <Text
                as="h1"
                fontSize="3xl"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Login to your account
              </Text>
              <Text
                mt="3"
                color={mode('gray.600', 'gray.400')}
                fontWeight="medium"
              >
                Need an account?{' '}
                <UnderlineLink link="/talent/sign-up">
                  Sign up here
                </UnderlineLink>
              </Text>
            </Box>
            <SigninForm user="talent" />

            <Box textAlign="center" mt={{ base: '3', md: '2' }}>
              <Text
                mt="3"
                color={mode('gray.600', 'gray.400')}
                fontWeight="medium"
              >
                Need to reset?{' '}
                <UnderlineLink link="/reset">Reset Password</UnderlineLink>
              </Text>
            </Box>
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
          textAlign="center"
        >
          You are the average of the 5 people you spend the most time with.
        </Heading>
        <Text mt="3" textAlign="center" fontSize="md">
          Connect with other incredible people who have joined 2-3 Degrees
          workshops and programme
        </Text>
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

        {/* <Text mt="5" maxW="md" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.
        </Text> */}
        {/* <HStack
          as="a"
          href="#"
          justify="center"
          display="inline-flex"
          minW="2xs"
          py="3"
          px="2"
          mt="5"
          fontWeight="semibold"
          border="2px solid white"
          rounded="lg"
          transition="all 0.2s"
          _hover={{ bg: 'whiteAlpha.200' }}
        > */}
        {/* <Button mt="5">Discover More</Button> */}
        {/* </HStack> */}
        {/* <Box mt="10" position="relative">
          <Img
            alt="App screenshot"
            src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621082943/pro-website/screenshot-dark_w6jpks.png"
          />
        </Box> */}
      </Flex>
    </Flex>
  );
};
