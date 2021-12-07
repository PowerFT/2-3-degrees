/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
// import { useUpdateRoleMutation } from './mutations/use-update-role-mutation';
import { useRegisterMutation } from './mutations/use-registration-mutation';
import { useAuthContext } from '../context';
import { navigate } from 'gatsby-link';

const errorCodes = {
  invalid_username:
    'Invalid username or email address. Please check it and try again.',
  invalid_email: 'Invalid email address. Please check it and try again.',
  incorrect_password:
    'Incorrect password. Please try again, or reset your password.',
  empty_username: 'Please provide your username.',
  empty_password: 'Please provide your password.',
};

/**
 * Hook which registers a new user.
 */
export const useRegistration = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { registerMutation } = useRegisterMutation();
  // const { updateRoleMutation } = useUpdateRoleMutation();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  // const register = ( email, password, role ) => {
  const register = (email, password, user) => {
    //console.log(isLoggedIn)
    setError(null);
    setStatus('resolving');
    return (
      registerMutation(email, password)
        // .then((res) => {
        // console.log('updated role')
        // const id = res.data.registerUser.user.id
        // return updateRoleMutation( id, role )
        // return updateRoleMutation( id )
        // })
        .then(() => {
          //console.log('success', isLoggedIn, setIsLoggedIn)
          // setIsLoggedIn( true );

          setStatus('resolved');
          navigate(`/${user}/sign-in`);
        })
        .catch((errors) => {
          // console.log(errors)
          setError(
            errorCodes[errors.message] ||
              `${stripHtml(decodeEntities(errors.message)).result}`
          );
          setStatus('resolved');
        })
    );
  };

  return {
    register,
    error,
    status,
  };
};
