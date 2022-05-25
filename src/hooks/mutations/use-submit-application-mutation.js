/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const SUBMIT_APPLICATION_MUTATION = gql`
  mutation createApplication(
    $clientMutationId: String
    $answer1: String
    $answer2: String
    $answer3: String!
    $applicantId: String!
    $jobId: String!
    $jobDatabaseId: String!
    $name: String
  ) {
    createApplication(
      input: {
        clientMutationId: $clientMutationId
        title: $name
        answer1: $answer1
        answer2: $answer2
        answer3: $answer3
        appliedJobs: { nodes: { name: $jobId, description: $jobDatabaseId } }
        jobApplicants: { nodes: { name: $applicantId } }
        status: PUBLISH
      }
    ) {
      clientMutationId
    }
  }
`;

export const useSubmitApplicationMutation = () => {
  const [mutation, mutationResults] = useMutation(SUBMIT_APPLICATION_MUTATION);

  return { mutation, results: mutationResults };
};
