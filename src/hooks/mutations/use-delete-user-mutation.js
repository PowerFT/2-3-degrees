/**
 * External dependencies
 */
 import { gql, useMutation } from '@apollo/client';

 const DELETEUSER = gql`
	 mutation DeleteUser($id: ID! ) {
		 deleteUser(input: { id: $id }) {
			 clientMutationId
		 }
	 }
 `;
 
 export const useDeleteUserMutation = () => {
	 const [ mutation, mutationResults ] = useMutation( DELETEUSER );
 
	 const deleteUserMutation = ( userId ) => {
		 return mutation( {
			 variables: {
				 id: userId,
			 },
		 } );
	 };
 
	 return { deleteUserMutation, results: mutationResults };
 };
