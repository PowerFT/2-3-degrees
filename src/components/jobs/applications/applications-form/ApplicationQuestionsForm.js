import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react';

import { MyError } from '../../../waiting/MyError';
import { MySpinner } from '../../../waiting/MySpinner';
import { AdminBlob } from '../../../AdminBlob';

const GET_JOB_POST_QUESTIONS = gql`
  query MyQuestionsQuery($id: ID!) {
    jobPost(id: $id) {
      jobApplicationQuestions {
        nodes {
          name
          id
          slug
        }
      }
    }
  }
`;

export const ApplicationQuestionsForm = ({
  jobId,
  formDeets,
  setFormDeets,
}) => {
  const { data, loading, error } = useQuery(GET_JOB_POST_QUESTIONS, {
    variables: {
      id: jobId,
    },
  });

  if (loading) return <MySpinner />;
  if (error) return <MyError error={error} />;
  if (!data)
    return (
      <MyError
        error={'Error loading application questions, please reload the page'}
      />
    );

  const askedQuestions = data.jobPost.jobApplicationQuestions.nodes.map(
    (node) => node.slug
  );
  return (
    <VStack spacing="4" mb="6">
      {askedQuestions.length === 0 && (
        <Box bg="gray.300" my="6" w="100%" maxW="lg" p="4">
          <Text>
            The opportunity maker has not asked for any additional questions.
          </Text>
        </Box>
      )}
      {askedQuestions.includes('question-1') && (
        <AdminBlob>
          <FormControl>
            <FormLabel htmlFor="questionSelect">
              Tell us why you would be great for this opportunity?
            </FormLabel>
            <Textarea
              // disabled={submitLoading || submitted}
              // htmlFor="questionSelect"
              rows={7}
              value={formDeets.answer1}
              onChange={(e) =>
                setFormDeets({
                  ...formDeets,
                  answer1: e.target.value,
                })
              }
            />
            {/* <FormHelperText>
                Brief description for your organisation's account.
              </FormHelperText> */}
          </FormControl>
        </AdminBlob>
      )}
      {askedQuestions.includes('question-2') && (
        <AdminBlob>
          <FormControl>
            <FormLabel htmlFor="questionSelect">
              Tell us about one of your key skills and how it is relevant to
              this opportunity?
            </FormLabel>
            <Textarea
              // disabled={submitLoading || submitted}
              // htmlFor="questionSelect"
              rows={7}
              value={formDeets.answer2}
              onChange={(e) =>
                setFormDeets({
                  ...formDeets,
                  answer2: e.target.value,
                })
              }
            />
            {/* <FormHelperText>
                Brief description for your organisation's account.
              </FormHelperText> */}
          </FormControl>
        </AdminBlob>
      )}
      {askedQuestions.includes('question-3') && (
        <AdminBlob>
          <FormControl>
            <FormLabel htmlFor="questionSelect">
              Tell us how this opportunity will contribute to your future plans?
            </FormLabel>
            <Textarea
              // disabled={submitLoading || submitted}
              // htmlFor="questionSelect"
              rows={7}
              value={formDeets.answer3}
              onChange={(e) =>
                setFormDeets({
                  ...formDeets,
                  answer3: e.target.value,
                })
              }
            />
            {/* <FormHelperText>
                Brief description for your organisation's account.
              </FormHelperText> */}
          </FormControl>
        </AdminBlob>
      )}
      {askedQuestions.includes('question-4') && (
        <AdminBlob>
          <FormControl>
            <FormLabel htmlFor="questionSelect">
              What experience do you have that is relevant to this opportunity?
            </FormLabel>
            <Textarea
              // disabled={submitLoading || submitted}
              // htmlFor="questionSelect"
              rows={7}
              value={formDeets.answer4}
              onChange={(e) =>
                setFormDeets({
                  ...formDeets,
                  answer4: e.target.value,
                })
              }
            />
            {/* <FormHelperText>
                Brief description for your organisation's account.
              </FormHelperText> */}
          </FormControl>
        </AdminBlob>
      )}
    </VStack>
  );
};
