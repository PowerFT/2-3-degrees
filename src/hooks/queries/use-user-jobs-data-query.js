/**
 * External dependencies
 */
 import { gql, useQuery } from '@apollo/client';

const GET_JOBS_BY_VIEWER = gql`
	query MyQuery($status: PostStatusEnum) {
		viewer {
			jobPosts(where: {status: $status}) {
				nodes {
					id
					title
					uri
					status
					content(format: RAW)
					salary
					jobType {
						nodes {
							name
						}
					}
					sector {
						nodes {
							name
						}
					}
					jobLocation {
						nodes {
							name
						}
					}
					companyName {
						nodes {
							name
						}
					}
				}
			}
		}
	}
`
 
 export const useUserJobsDataQuery = () => {
	const { loading, error, data, refetch } = useQuery( GET_JOBS_BY_VIEWER )
	return {
		loading, 
		error, 
		data: data ? data : null,
		refetch
	}
 };
 