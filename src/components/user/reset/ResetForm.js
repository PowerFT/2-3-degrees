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
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React, {useState} from 'react'
 /**
  * Internal dependencies
  */
// import { UnderlineLink } from './UnderlineLink'
import { useResetPassword } from '../../../hooks';

export const ResetForm = () => {
  
  const [ email, setEmail ] = useState( '' );
	const { sendResetPasswordEmail, error, status } = useResetPassword();

  console.log(email, "form")
	const handleSubmit = ( e ) => {
		e.preventDefault();
		sendResetPasswordEmail( email );
	};

	if ( status === 'resolved' && ! error ) {
		return (
			<Text>Instructions have been emailed to you. Check your inbox.</Text>
		)
	}

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
        onSubmit={ handleSubmit }
      >
        <Stack>
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
        </Stack>
        <Button
          size="lg"
          type="submit"
          mt="8"
          w="full"
          bg="dBlue.300"
          _hover={{bg:"dBlue.200"}}
        >
          Send Reset Password Link
        </Button>
      </form>
    </>
  )
}
