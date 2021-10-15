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
			username
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
	const { setisloggedin, isloggedin } = useAuthContext()

	useEffect( () => {
		if ( isloggedin ) {
			// console.log('getting viewer...')
			getViewer()
			// console.log(data)
		}
	}, [isloggedin] )

	const onError = useSafeDispatch( (error) => {
		// console.log(error)
		setisloggedin( false );
	} );

	const onCompleted = useSafeDispatch( ( theData ) => {
		// console.log('onComplete', theData)
		if ( !theData.viewer ) {
			// console.log('onComplete failed, no data, logging out')
			setisloggedin( false );
		}
	});

	const [ getViewer, { loading, error, data, refetch } ] = useLazyQuery( VIEWER, {
		fetchPolicy: 'network-only',
		onError,
		onCompleted,
	} );

	return {
		loading,
		error,
		data: data && data.viewer ? data.viewer : null,
		getViewer,
		refetch
	};
};