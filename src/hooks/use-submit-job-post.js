/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
* Internal dependencies
*/
import { useCreateJobPostMutation, useUpdateJobPostMutation } from './mutations';
import { navigate } from 'gatsby-link';

/**
* Hook which submits content via the API.
*
* @param {string} contentType Type of content (post type) e.g. character, tavern
*/
export const useSubmitJobPost = ( formType ) => {
	const [ submitLoading, setSubmitLoading ] = useState( false );
	const { mutation: createJobPost } = useCreateJobPostMutation();
	const { mutation: updateJobPost } = useUpdateJobPostMutation();

	const submitJobPost = ( props ) => {

		console.log(props)
		setSubmitLoading( true );

		const success = ( result ) => {
			navigate('/maker/myjobs')
			console.log(result)
			console.log('update success')
			setSubmitLoading( false );
			return result.data;
		};

		const fail = ( errors ) => {
			console.log('update fail', errors)
			setSubmitLoading( false );
			throw new Error(
				`${ stripHtml( decodeEntities( errors.message ) ).result }`
			);
		};

		const {
			clientMutationId,
			id,
			title,
			companyName,
			jobType,
			jobLocation,
			sector,
			salary,
			content,
			companyBio,
			closeDate,
		} = props.variables;

		console.log(id, title)
		console.log(formType)

		switch ( formType ) {
			case 'create':
				console.log('create fired: ', title)
				return createJobPost( {
					variables: {
						clientMutationId,
						title,
						companyName,
						jobType,
						jobLocation,
						sector,
						salary,
						content,
						companyBio,
						closeDate,
						category: 'Job Post',
					},
				} )
					.then( success )
					.catch( fail );
			case 'update':
				return updateJobPost( {
					variables: {
						clientMutationId,
						id,
						title,
						companyName,
						jobType,
						jobLocation,
						sector,
						salary,
						content,
						companyBio,
						closeDate,
						category: 'Job Post',
					},
				} )
					.then( success )
					.catch( fail );
		}

		return Promise.reject();
	};

	return {
		submitJobPost,
		submitLoading,
	};
};
