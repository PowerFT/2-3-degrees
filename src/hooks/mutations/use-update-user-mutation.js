/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

const UPDATEUSER = gql`
  mutation UpdateUser(
    $clientMutationId: String!
    $id: ID!
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $companyName: String
    $companyBio: String
    $roles: [String]
    $companyWebsite: String
    $dob: String
    $postcode: String
  ) {
    updateUser(
      input: {
        clientMutationId: $clientMutationId
        id: $id
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        nickname: $companyName
        roles: $roles
        description: $companyBio
        websiteUrl: $companyWebsite
        dob: $dob
        postcode: $postcode
      }
    ) {
      clientMutationId
    }
  }
`;

export const useUpdateUserMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATEUSER);

  const updateUserMutation = (accountDeets) => {
    return mutation({
      variables: {
        clientMutationId: uuidv4(),
        id: accountDeets?.id,
        email: accountDeets?.email,
        password: accountDeets?.password,
        firstName: accountDeets?.firstName,
        lastName: accountDeets?.lastName,
        companyName: accountDeets?.companyName,
        roles: accountDeets?.roles,
        companyBio: accountDeets?.companyBio,
        companyWebsite: accountDeets?.companyWebsite,
        dob: accountDeets?.dob,
        postcode: accountDeets?.postcode,
      },
    });
  };

  return { updateUserMutation, results: mutationResults };
};
