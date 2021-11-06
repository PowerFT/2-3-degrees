/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const CREATE_JOB_MUTATION = gql`
  mutation CreateJobPost(
    $clientMutationId: String!
    $title: String!
    $companyName: String!
    $jobType: String!
    $jobLocation: String!
    $sector: String!
    $salary: String!
    $salaryStructures: String!
    $content: String!
    $category: String!
    $closeDate: String!
    $companyBio: String!
    $skills: [JobPostSkillsNodeInput]
    $jobApplicationQuestions: [JobPostJobApplicationQuestionsNodeInput]
  ) {
    createJobPost(
      input: {
        clientMutationId: $clientMutationId
        title: $title
        companyName: { nodes: { name: $companyName } }
        jobType: { nodes: { name: $jobType } }
        jobLocation: { nodes: { name: $jobLocation } }
        sector: { nodes: { name: $sector } }
        salary: $salary
        salaryStructures: { nodes: { name: $salaryStructures } }
        content: $content
        closeDate: $closeDate
        companyBio: $companyBio
        categories: { nodes: { name: $category } }
        status: DRAFT
        skills: { append: false, nodes: $skills }
        jobApplicationQuestions: {
          append: false
          nodes: $jobApplicationQuestions
        }
      }
    ) {
      clientMutationId
      jobPost {
        databaseId
        id
      }
    }
  }
`;

export const useCreateJobPostMutation = () => {
  const [mutation, mutationResults] = useMutation(CREATE_JOB_MUTATION);

  return { mutation, results: mutationResults };
};
