/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
	mutation RegisterUser(
		$email: String!
		$password: String!
	) {
		registerUser(
			input: { username: $email, email: $email, password: $password }
		) {
			clientMutationId
			user {
				id
			}
		}
	}
`;
 
export const useRegisterMutation = () => {
	const [ mutation, mutationResults ] = useMutation( REGISTER );

	const registerMutation = ( email, password ) => {
		//console.log(email, password)
		return mutation( {
			variables: {
				username: email,
				email,
				password,
			},
		} );
	};

	return { registerMutation, results: mutationResults };
};
 