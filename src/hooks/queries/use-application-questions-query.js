/**
 * External dependencies
 */
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GET_JOB_POST_QUESTIONS = gql`
  query JobPostQuery($id: ID) {
    viewer {
      jobPost(id: $id) {
        nodes {
          jobApplicationQuestions {
            nodes {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export const useApplicationQuestionsQuery = (jobId) => {
  const { loading, error, data } = useQuery(GET_JOB_POST_QUESTIONS, {
    variables: {
      id: jobId,
    },
  });
  return {
    loading,
    error,
    data: data ? data : null,
  };
};
