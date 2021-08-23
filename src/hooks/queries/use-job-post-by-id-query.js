/**
 * External dependencies
 */
import { gql, useQuery } from '@apollo/client';

const GET_JOB_POST_BY_ID = gql`
	query JobPostById($id: ID!) {
		jobPost(id: $id) {
			closeDate
			companyBio
			content(format: RAW)
			salary
			title
			id
			sector {
				nodes {
					name
				}
			}
			jobType {
				nodes {
					name
				}
			}
			companyName {
				nodes {
					name
				}
			}
			jobLocation {
				nodes {
					name
				}
			}
		}
	}
`

export const useJobPostByIdQuery = (id) => {
	const { loading, error, data } = useQuery( GET_JOB_POST_BY_ID, {
		variables: {
			id: id
		}
	})
	return {
		loading, 
		error, 
		data: data && data.jobPost ? data.jobPost : null
	}
};