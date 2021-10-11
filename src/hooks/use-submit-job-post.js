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
	const [ submitErrors, setSubmitErrors ] = useState( null );
	const { mutation: createJobPost } = useCreateJobPostMutation();
	const { mutation: updateJobPost } = useUpdateJobPostMutation();

	const submitJobPost = ( props ) => {

		setSubmitLoading( true );

		const successCreate = ( result ) => {
			console.log(result, "create")
			// navigate('/maker/jobs')
			setSubmitLoading( false );
			return result.data;
		};
		const successUpdate = ( result ) => {
			console.log(result, "update")
			// navigate('/maker/jobs')
			setSubmitLoading( false );
			return result.data;
		};

		const fail = ( errors ) => {
			setSubmitLoading( false );
			setSubmitErrors(errors)
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
			salaryStructures,
			applicationLink,
			content,
			companyBio,
			closeDate,
			skills
		} = props;

		//console.log(id, title)
		console.log("formType: ", formType)

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
						salaryStructures,
						applicationLink,
						content,
						companyBio,
						closeDate,
						category: 'Job Post',
						skills
					},
				} )
					.then( successCreate )
					.catch( fail );
			case 'update':
				console.log('update fired: ', title)
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
						salaryStructures,
						applicationLink,
						content,
						companyBio,
						closeDate,
						category: 'Job Post',
					},
				} )
					.then( successUpdate )
					.catch( fail );
		}

		return Promise.reject();
	};

	return {
		submitJobPost,
		submitLoading,
		submitErrors
	};
};
