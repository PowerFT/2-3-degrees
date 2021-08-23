/**
 * External dependencies
 */
 import { gql, useMutation } from '@apollo/client';

 const DELETEUSER = gql`
	 mutation DeleteJobPost($id: ID! ) {
		 deleteJobPost(input: { id: $id }) {
			 clientMutationId
		 }
	 }
 `;
 
 export const useDeleteJobPostMutation = () => {
	 const [ mutation, mutationResults ] = useMutation( DELETEUSER );
 
	 const deleteJobPostMutation = ( jobPostId ) => {
		 return mutation( {
			 variables: {
				 id: jobPostId,
			 },
		 } );
	 };
 
	 return { deleteJobPostMutation, results: mutationResults };
 };
