/**
 * External dependencies
 */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { navigate } from 'gatsby';
import React, {useState} from 'react'
// import {Link as GatsbyLink} from 'gatsby'
 /**
  * Internal dependencies
  */
// import { UnderlineLink } from './UnderlineLink'
import { useAuth } from '../../../hooks';

export const SigninForm = ({user}) => {
  
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const { login, viewer, loadingViewer, error, status } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault()
    login( email, password )
  }

  return (
    <>
      { 
        error &&
        <Alert status="warning">
          <AlertIcon />
          {error}
          - Please refesh the page.
        </Alert>
      }

      <form
        onSubmit={handleSubmit}
      >
        <Stack spacing="-px">
          <FormControl id="email-address">
            <FormLabel srOnly>Email address</FormLabel>
            <Input
              size="lg"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              bg={mode('white', 'gray.700')}
              fontSize="md"
              roundedBottom="0"
              value={email} 
              onChange={e=> setEmail(e.target.value)}
              disabled={ status === 'resolving' }
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel srOnly>Email address</FormLabel>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              size="lg"
              bg={mode('white', 'gray.700')}
              fontSize="md"
              roundedTop="0"
              placeholder="Password"
              value={password} 
              onChange={e=> setPassword(e.target.value)}
              disabled={ status === 'resolving' }
            />
          </FormControl>
          <Box pb="3"></Box>
        </Stack>
        <Button
          size="lg"
          type="submit"
          mt="8"
          w="full"
          bg="dBlue.300"
        >
          Sign In
        </Button>
      </form>
    </>
  )
}
