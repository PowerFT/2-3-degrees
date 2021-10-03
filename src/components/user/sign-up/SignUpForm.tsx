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
  useToast,
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
/**
* Internal dependencies
*/
import { useRegistration } from '../../../hooks';

export const SignUpForm = ({user}) => {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const { register, error, status } = useRegistration();
  console.log(status)

  const toast = useToast()

  useEffect(() => {
    if(status === 'resolved') {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
  }, [status])

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
          register( email, password, user )
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
            <FormLabel srOnly>Password</FormLabel>
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
            bg="dOrange.300"
          >
            Sign up
          </Button>
        </LightMode>
      </form>
    </>
  )
}
