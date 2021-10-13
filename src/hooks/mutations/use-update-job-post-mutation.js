/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJobPost(
    $clientMutationId: String!,
    $id: ID!,
    $title: String,
    $companyName: String,
    $jobType: String,
    $jobLocation: String,
    $sector: String,
    $salary: String,
    $salaryStructures: String,
    $content: String,
    $category: String,
    $closeDate: String,
    $companyBio: String,
    $applicationLink: String,
    $skills: [JobPostSkillsNodeInput]
    ) {
      updateJobPost(input: {
        clientMutationId: $clientMutationId,
        id: $id,
        title: $title,
        companyName: {nodes: {name: $companyName}},
        jobType: {nodes: {name: $jobType}},
        jobLocation: {nodes: {name: $jobLocation}},
        sector: {nodes: {name: $sector}},
        salary: $salary,
        salaryStructures: {nodes: {name: $salaryStructures}},
        content: $content,
        closeDate: $closeDate,
        companyBio: $companyBio,
        applicationLink: $applicationLink,
        categories: {nodes: {name: $category}},
        status: DRAFT,
        skills: {
          append: true,
          nodes: $skills
        },
      }) {
          clientMutationId
          jobPost {
            id
          }
        }
    }
`

export const useUpdateJobPostMutation = () => {
	const [ mutation, mutationResults ] = useMutation( UPDATE_JOB_MUTATION );

	return { mutation, results: mutationResults };
};
