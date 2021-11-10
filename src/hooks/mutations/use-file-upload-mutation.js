/**
 * External dependencies
 */
import { gql, useMutation, useApolloClient } from '@apollo/client';
// import { v4 as uuidv4 } from "uuid"

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    upload(input: { file: $file }) {
      clientMutationId
      text
    }
  }
`;

export const useFileUploadMutation = () => {
  const [mutation, mutationResults] = useMutation(UPLOAD_FILE);

  const fileUploadMutation = async (file) => {
    // console.log(file)
    return mutation({
      variables: {
        file,
      },
    });
  };

  return { fileUploadMutation, results: mutationResults };
};
