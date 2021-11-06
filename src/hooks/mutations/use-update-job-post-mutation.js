/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJobPost(
    $clientMutationId: String!
    $id: ID!
    $title: String
    $companyName: String
    $jobType: String
    $jobLocation: String
    $sector: String
    $salary: String
    $salaryStructures: String
    $content: String
    $category: String
    $closeDate: String
    $companyBio: String
    $skills: [JobPostSkillsNodeInput]
    $jobApplicationQuestions: [JobPostJobApplicationQuestionsNodeInput]
    $status: PostStatusEnum
  ) {
    updateJobPost(
      input: {
        clientMutationId: $clientMutationId
        id: $id
        title: $title
        companyName: { nodes: { name: $companyName }, append: false }
        jobType: { nodes: { name: $jobType }, append: false }
        jobLocation: { nodes: { name: $jobLocation }, append: false }
        sector: { nodes: { name: $sector }, append: false }
        salary: $salary
        salaryStructures: { nodes: { name: $salaryStructures }, append: false }
        content: $content
        closeDate: $closeDate
        companyBio: $companyBio
        categories: { nodes: { name: $category } }
        status: $status
        skills: { nodes: $skills, append: false }
        jobApplicationQuestions: {
          nodes: $jobApplicationQuestions
          append: false
        }
      }
    ) {
      clientMutationId
      jobPost {
        id
      }
    }
  }
`;

export const useUpdateJobPostMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_JOB_MUTATION);

  return { mutation, results: mutationResults };
};
