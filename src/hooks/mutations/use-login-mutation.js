/**
 * External dependencies
 */
 import { gql, useMutation } from '@apollo/client'

 const LOGIN = gql`
	 mutation Login($email: String!, $password: String!) {
		 loginWithCookies(input: { login: $email, password: $password }) {
			 status
		 }
	 }
 `
 
 export const useLoginMutation = () => {
	 
	 const [ mutation, mutationResults ] = useMutation( LOGIN )
 
	 const loginMutation = ( email, password ) => {
		console.log('loggin,', email, password)
		 return mutation( {
			 variables: {
				 email,
				 password,
			 },
		 } )
	 }
 
	 return { loginMutation, results: mutationResults }
 }