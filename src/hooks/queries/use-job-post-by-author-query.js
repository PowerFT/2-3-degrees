// /**
//  * External dependencies
//  */
// import { gql, useQuery } from '@apollo/client';

// const GET_JOBS = gql`
// 	query MyQuery($status: PostStatusEnum, $id: ID) {
// 		viewer {
// 			jobPosts(where: {status: $status, id: $id}) {
// 				nodes {
// 					id
// 					title
// 					uri
// 					status
// 					content(format: RAW)
// 					salary
// 					jobType {
// 						nodes {
// 							name
// 						}
// 					}
// 					sector {
// 						nodes {
// 							name
// 						}
// 					}
// 					jobLocation {
// 						nodes {
// 							name
// 						}
// 					}
// 					companyName {
// 						nodes {
// 							name
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `

// export const useJobPostByAuthorQuery = () => {
// 	const { loading, error, data } = useQuery( GET_JOBS )
// 	return {
// 		loading, 
// 		error, 
// 		data: data && data.jobPost ? data.jobPost : null
// 	}
// };