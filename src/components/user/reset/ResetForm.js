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
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React, {useState} from 'react'
 /**
  * Internal dependencies
  */
// import { UnderlineLink } from './UnderlineLink'
import { useResetPassword } from '../../../hooks';

export const ResetForm = ({user}) => {
  
  const [ email, setEmail ] = useState( '' );
	const { sendResetPasswordEmail, error, status } = useResetPassword();

  console.log(email, "form")
	const handleSubmit = ( e ) => {
		e.preventDefault();
		sendResetPasswordEmail( email );
	};

	if ( status === 'resolved' && ! error ) {
		return (
			<p>Instructions have been emailed to you. Check your inbox.</p>
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
        >
          Reset Password
        </Button>
      </form>
    </>
  )
}
