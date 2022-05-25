/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
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
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const register = (email, password, user) => {
    setError(null);
    setStatus('resolving');
    return registerMutation(email, password)
      .then(() => {
        setStatus('resolved');
        navigate(`/${user}/sign-in`);
      })
      .catch((errors) => {
        setError(
          errorCodes[errors.message] ||
            `${stripHtml(decodeEntities(errors.message)).result}`
        );
        setStatus('resolved');
      });
  };

  return {
    register,
    error,
    status,
  };
};
