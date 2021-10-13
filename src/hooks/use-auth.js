/**
* External dependencies
*/
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
* Internal dependencies
*/
import { useLogoutMutation } from './mutations/use-logout-mutation';
import { useLoginMutation } from './mutations/use-login-mutation';
import { useViewerQuery } from './queries/use-viewer-query';
import { useAuthContext } from '../context';
import { useSafeDispatch } from '../hooks';
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
* Keeps track of user authentication
*/

export const useAuth = () => {

	const { isLoggedIn, setIsLoggedIn } = useAuthContext()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const [status, setStatus] = useState('idle')
	const { logoutMutation } = useLogoutMutation()
	const { loginMutation } = useLoginMutation()
	const {
		data: viewer,
		// refetch: refetchViewer,
		loading: loadingViewer,
	} = useViewerQuery();

	const onLoginSuccess = useSafeDispatch(() => {
		setIsLoggedIn(true);
		setStatus('resolved');
	});

	const onLogoutSuccess = useSafeDispatch(() => {
		setIsLoggedIn(false);
		setStatus('resolved');
		navigate('/')
	});

	const onError = useSafeDispatch((errors) => {
		setError(
			errorCodes[errors.message] ||
			`${stripHtml(decodeEntities(errors.message)).result}`
		);
		setStatus('resolved');
	});

	const login = (email, password) => {
		setError(null);
		setStatus('resolving');
		return loginMutation(email, password)
			.then(onLoginSuccess)
			.catch(onError);
	};

	const logout = () => {
		setLoading(true)
		setStatus('resolving');
		return logoutMutation()
			.then(onLogoutSuccess)
			.catch(onError);
	};

	return {
		login,
		logout,
		isLoggedIn,
		// refetchViewer,
		loadingViewer,
		loading,
		viewer,
		error,
		status,
	};
}
