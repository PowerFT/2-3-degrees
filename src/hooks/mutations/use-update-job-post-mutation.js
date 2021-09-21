/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const UPDATE_JOB_MUTATION = gql`
  mutation CreateJobPost(
    $clientMutationId: String!,
    $id: ID!,
    $title: String,
    $companyName: String,
    $jobType: String,
    $jobLocation: String,
    $sector: String,
    $salary: String,
    $salaryStructure: String,
    $content: String,
    $category: String,
    $closeDate: String,
    $companyBio: String
    ) {
      updateJobPost(input: {
        clientMutationId: $clientMutationId,
        id: $id
        title: $title,
        companyName: {nodes: {name: $companyName}},
        jobType: {nodes: {name: $jobType}},
        jobLocation: {nodes: {name: $jobLocation}},
        sector: {nodes: {name: $sector}},
        salary: $salary,
        salaryStructures: {nodes: {name: $salaryStructure}},
        content: $content,
        closeDate: $closeDate,
        companyBio: $companyBio
        categories: {nodes: {name: $category}},
        status: DRAFT
      }) {
          clientMutationId
          jobPost {
            id
            databaseId
          }
        }
    }
`

export const useUpdateJobPostMutation = () => {
	const [ mutation, mutationResults ] = useMutation( UPDATE_JOB_MUTATION );

	return { mutation, results: mutationResults };
};
