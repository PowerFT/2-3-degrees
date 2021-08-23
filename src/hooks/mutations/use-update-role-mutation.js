/**
 * External dependencies
 */
 import { gql, useMutation } from '@apollo/client';

 const UPDATE_ROLE = gql`
	 mutation RegisterUser(
		 $id: ID!
		 $role: [String]!
	 ) {
			updateUser(input: {id: $id, roles: $role}) {
				clientMutationId
			}
	 }
 `;
 
 export const useUpdateRoleMutation = () => {
	 const [ mutation, mutationResults ] = useMutation( UPDATE_ROLE );
 
	 const updateRoleMutation = ( id, role ) => {
		 console.log(id, role)
		 return mutation( {
			 variables: {
				 id,
				 role,
			 },
		 } );
	 };
 
	 return { updateRoleMutation, results: mutationResults };
 };
 