/**
 * External dependencies
 */
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React, {useState} from 'react'
// import {Link as GatsbyLink} from 'gatsby'
 /**
  * Internal dependencies
  */
// import { UnderlineLink } from './UnderlineLink'
import { useAuth } from '../../../hooks';

export const SigninForm = () => {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const { login, error, status } = useAuth();

  return (
    <>
      { 
        error &&
        <Alert status="warning">
          <AlertIcon />
          {error}
        </Alert>
      }

      <form
        onSubmit={(e) => {
          e.preventDefault()
          login(email, password)
        }}
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
        </Stack>
        {/* <Flex align="center" justify="space-between" mt="8">
          <LightMode>
            <Checkbox
              size="lg"
              colorScheme="blue"
              sx={{
                '.chakra-checkbox__control': {
                  '&:not([data-checked])': { bg: mode('white', 'gray.700') },
                  rounded: 'base',
                  borderWidth: '1px',
                },
                '.chakra-checkbox__label': { fontSize: 'sm' },
              }}
            >
              Remember me
            </Checkbox>
          </LightMode>
          <UnderlineLink fontSize="sm">Forgot Password</UnderlineLink>
        </Flex> */}
        <LightMode>
          <Button
            size="lg"
            type="submit"
            mt="8"
            w="full"
            bg="#4c907f"
            color={mode('gray.50', 'inherit')}
            fontSize="md"
            fontWeight="bold"
          >
            Sign in
          </Button>
        </LightMode>
      </form>
    </>
  )
}
