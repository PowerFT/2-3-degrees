/**
 * External dependencies
 */
 import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  // useColorModeValue as mode,
  IconButton,
} from '@chakra-ui/react'
import { Link } from 'gatsby';
import React, {useEffect, useState} from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
 /**
  * Internal dependencies
  */
// import { UnderlineLink } from './UnderlineLink'
import { useResetPassword } from '../../../hooks';
// import { PasswordField } from '../sign-in/PasswordField'

const getResetDeets = (query) => {
  const fallback = ''

  if (query) {
    const queriedTag = queryString.parse(query);
    const { key, username, user } = queriedTag

    // Ensure a valid expected value is passed
    if (key || username || user) {
      //console.log('link query returned', key, username)
      return {
				key,
				username,
        user
			};
    }
    //console.log('parsing didnt work')
    return fallback;
  }
  //console.log('location.search doesnt exsit')
  return fallback;
};

export const ResetPasswordForm = React.forwardRef ((props, ref) => {

  const location = useLocation();
	const info = location.search ? getResetDeets(location.search) : '';

  const [ password1, setPassword1 ] = useState( '' );
	const [ password2, setPassword2 ] = useState( '' );
	const [ passwordError, setPasswordError ] = useState( '' );
	const { resetUserPassword, error, status } = useResetPassword();


  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef(null)
  const mergeRef = useMergeRefs(inputRef, ref)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current

    if (input) {
      input.focus({
        preventScroll: true,
      })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

	const handleSubmit = ( e ) => {
		e.preventDefault();
		setPasswordError( '' );
		if ( password1 !== password2 ) {
			setPasswordError( 'Passwords do not match!' );
			return;
		}
		resetUserPassword( info.key, info.username, password1 );
	};

	if ( status === 'resolved' && ! error ) {
		return (
				<p>
					Your password has been reset. You can now{ ' ' }
					<Link to={`/${info.user}/sign-in`}>
						Sign-in
					</Link>
					.
				</p>
		);
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
          

        <FormControl id="password1">
          <InputGroup>
            <InputRightElement h="100%">
              <IconButton
                bg="transparent !important"
                variant="ghost"
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              ref={mergeRef}
              name="password"
              placeholder="Password"
              type={isOpen ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password1} 
              onChange={e=> setPassword1(e.target.value)}
              disabled={ status === 'resolving' }
              fontSize="md"
              roundedTop="0"
              size="lg"
              {...props}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="password2">
          <InputGroup>
            <InputRightElement h="100%">
              <IconButton
                bg="transparent !important"
                variant="ghost"
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              ref={mergeRef}
              name="password"
              placeholder="Password"
              type={isOpen ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password2} 
              onChange={e=> setPassword2(e.target.value)}
              disabled={ status === 'resolving' }
              fontSize="md"
              roundedTop="0"
              size="lg"
              {...props}
            />
          </InputGroup>
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
})
