/**
* External dependencies
*/
import React from 'react'
import { Stack, Text } from '@chakra-ui/layout'
import { gql, useQuery } from '@apollo/client'
// import InfiniteScroll from 'react-infinite-scroll-component'
/**
* Internal dependencies
*/
import { JobCard } from '../../job-card';
import { Button } from '@chakra-ui/button';
import { MySpinner } from '../../../waiting/MySpinner';

const GET_JOBS = gql`
	query MyQuery($first: Int!, $after: String, $where: RootQueryToJobPostConnectionWhereArgs) {
		jobPosts(
			first: $first, 
			after: $after
			where: $where) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					title
					salary
					content(format: RAW)
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
				}
			}
		}
	}
`

const BATCH_SIZE = 100

export const JobsBoardJobList = ({ locations, sectors, jobTypes }) => {
	console.log(locations, sectors, jobTypes)

	const where = !locations.length && !sectors.length && !jobTypes.length ? null : {
		taxQuery: {
			relation: 'OR',
			taxArray: [
				{ terms: locations, taxonomy: 'JOBLOCATION', operator: 'IN', field: 'NAME' },
				{ terms: jobTypes, taxonomy: 'JOBTYPE', operator: 'IN', field: 'NAME' },
				{ terms: sectors, taxonomy: 'SECTOR', operator: 'IN', field: 'NAME' },
			]
		}
	}
	console.log(where)

	const { loading, error, data, fetchMore } = useQuery(GET_JOBS, {
		variables: {
			first: BATCH_SIZE,
			after: null,
			notifyOnNetworkStatusChange: true,
			where
		}
	});

	// function fetchMorePosts () {
	// 	fetchMore( {variables: {
	// 			after: data.jobPosts.pageInfo.endCursor,
	// 			jobLocation: locations && locations,
	// 			jobType: sectors && sectors,
	// 			sector: jobTypes && jobTypes,
	// 		}} )
	// }

	if (error) return <p>{`Error: ${error}`}</p>
	if (!data && loading) return <MySpinner />
	if (!data?.jobPosts.edges.length) return <p>No posts found.</p>
	// console.log(data.jobPosts.pageInfo.endCursor)
	const haveMorePosts = Boolean(data.jobPosts?.pageInfo?.hasNextPage)
	const jobPosts = data.jobPosts.edges.map(edge => edge.node)

	return (
		<>
			<Stack py="10" spacing="6" id="jobList">

				{/* <InfiniteScroll
					dataLength={jobPosts.length}
					next={fetchMorePosts()}
					hasMore={haveMorePosts}
					loader={<p>loading jobs...</p>}
					endMessage={<p>All jobs loaded.</p>}
				> */}
				<Text>Discover new opportunities</Text>
				{jobPosts.map(post => (
					<JobCard
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
				{/* </InfiniteScroll> */}
			</Stack>

			{haveMorePosts ? (
				<form
					method="post"
					onSubmit={(event) => {
						console.log('submitting!')
						event.preventDefault();
						fetchMore({
							variables: {
								after: data.jobPosts.pageInfo.endCursor,
							}
						})
					}}
				>
					<Button type="submit" disabled={loading}>
						{loading ? "Loading..." : "Load more"}
					</Button>
				</form>
			) : (
				// <p>✅ All posts loaded.</p>
				<></>
			)}
		</>
	)
}