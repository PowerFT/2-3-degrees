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
import {MySpinner} from '../../waiting/MySpinner'
import { useAuth } from '../../../hooks'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { MyError } from '../../waiting/MyError'

const GET_JOBS_BY_VIEWER = gql`
	query MyJobsQuery($status: PostStatusEnum) {
		viewer {
			id
			jobPosts(where: {status: $status}) {
				nodes {
					id
					title
					uri
					status
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

export const JobsList = (props) => {

	const { statusSelected, setLoading, setError } = props

	const { loading, error, data, refetch } = useQuery(GET_JOBS_BY_VIEWER, {
		variables: {
			status: statusSelected,
		}
	})

	useEffect(() => {
		refetch()
	}, [statusSelected])

	if (error) return <MyError error={`Error: ${error}`} />
	if (!data && loading) return <MySpinner />
	if (!data) return <p>No posts found.</p>
	if(data.viewer?.jobPosts?.nodes.length === 0) return <MyError error="No Opportunities found, try a different 'post status'"/>

	return (
		<JobsCardContainer >
			{data.viewer?.jobPosts?.nodes.map(post => (
				<MyJobCard
					key={post?.id}
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
