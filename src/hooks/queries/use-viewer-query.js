/**
 * External dependencies
 */
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

/**
* Internal dependencies
*/
import { useAuthContext } from '../../context';
import { useSafeDispatch } from '../../hooks';

const VIEWER = gql`
	query viewer {
		viewer {
			id
			firstName
			lastName
			nickname
			description
			email
			url
			roles {
				nodes {
					name
				}
			}
		}
	}
`

/**
* Hook which gets details about the logged in user.
*/
export const useViewerQuery = () => {
	const { setIsLoggedIn, isLoggedIn } = useAuthContext()

	useEffect( () => {
		if ( isLoggedIn ) {
			// console.log('getting viewer...')
			getViewer()
			// console.log(data)
		}
	}, [isLoggedIn] )

	const onError = useSafeDispatch( (error) => {
		console.log(error)
		setIsLoggedIn( false );
	} );

	const onCompleted = useSafeDispatch( ( theData ) => {
		console.log('onComplete', theData)
		if ( !theData.viewer ) {
			console.log('onComplete failed, no data, logging out')
			setIsLoggedIn( false );
		}
	});

	const [ getViewer, { loading, error, data } ] = useLazyQuery( VIEWER, {
		fetchPolicy: 'network-only',
		onError,
		onCompleted,
	} );

	return {
		loading,
		error,
		data: data && data.viewer ? data.viewer : null,
		getViewer,
	};
};