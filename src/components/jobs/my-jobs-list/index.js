/**
* External dependencies
*/
import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
/**
* Internal dependencies
*/
// import { useUserJobsDataQuery } from '../../../hooks/queries/use-user-jobs-data-query'
import { MyJobCard } from '../job-card/MyJobCard'
import { JobsCardContainer } from '../JobsCardContainer'

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

export const JobsList = ({ statusSelected, setLoading, setError }) => {

	// const [jobPosts, setJobPosts] = useState({})
	const { loading, error, data, refetch } = useQuery(GET_JOBS_BY_VIEWER, {
		variables: {
			status: statusSelected
		}
	})

	useEffect(() => {
		refetch({ variables: { status: statusSelected } }).catch(err => console.log(err))
		console.log(statusSelected)
	}, [statusSelected, refetch])

	if (error) return <p>{`Error: ${error}`}</p>
	if (loading) return <p>loading jobs...</p>
	if (!data) return <p>No posts found.</p>

	return (
		<JobsCardContainer >
			{data.viewer.jobPosts.nodes.map(post => (
				<MyJobCard
					title={post?.title}
					jobLocation={post?.jobLocation?.nodes[0]?.name}
					jobType={post?.jobType?.nodes[0]?.name}
					sector={post?.sector?.nodes[0]?.name}
					salary={post?.salary}
					companyName={post?.companyName?.nodes[0]?.name}
					jobPostLink={post?.uri}
					status={post?.status}
					content={post?.content}
					id={post?.id}
				/>
			))}
		</JobsCardContainer>
	)
}
