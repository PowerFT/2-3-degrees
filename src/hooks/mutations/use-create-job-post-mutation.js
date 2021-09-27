/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const CREATE_JOB_MUTATION = gql`
  mutation CreateJobPost(
    $clientMutationId: String!,
    $title: String!,
    $companyName: String!,
    $jobType: String!,
    $jobLocation: String!,
    $sector: String!,
    $salary: String!,
    $salaryStructures: String! 
    $content: String!,
    $category: String!,
    $closeDate: String!,
    $companyBio: String!,
    $applicationLink: String!,
    $skills: [JobPostSkillsNodeInput]!
    ) {
      createJobPost(input: {
        clientMutationId: $clientMutationId,
        title: $title,
        companyName: {nodes: {name: $companyName}},
        jobType: {nodes: {name: $jobType}},
        jobLocation: {nodes: {name: $jobLocation}},
        sector: {nodes: {name: $sector}},
        salary: $salary,
        salaryStructures: {nodes: {name: $salaryStructures}}
        content: $content,
        closeDate: $closeDate,
        companyBio: $companyBio
        categories: {nodes: {name: $category}},
        applicationLink: $applicationLink,
        status: DRAFT,
        skills: {
          append: true,
          nodes: $skills
        },
      }) {
          clientMutationId
          jobPost {
            databaseId
            id
          }
        }
    }
`

export const useCreateJobPostMutation = () => {
  console.log("create")
	const [ mutation, mutationResults ] = useMutation( CREATE_JOB_MUTATION );

	return { mutation, results: mutationResults };
};
