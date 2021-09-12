/**
 * External dependencies
 */
import { useState } from 'react';
// import { decodeEntities } from '@wordpress/html-entities';
// import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useDeleteUserMutation } from './mutations/use-delete-user-mutation';

export const useDeleteUser = (userId) => {
	const [ error, setError ] = useState( null );
	const [ status, setStatus ] = useState( 'idle' );
	const { deleteUserMutation } = useDeleteUserMutation();

	const deleteUser = () => {
		setError( null );
		setStatus( 'resolving' );
		return deleteUserMutation( userId )
			.then( () => {
				//console.log('sent delete mutation')
				setStatus( 'resolved' );
			} )
			.catch( ( errors ) => {
				//console.log(errors)
				setError(errors);
				setStatus( 'resolved' );
			} );
	};

	return {
		deleteUser,
		error,
		status,
	};
};
