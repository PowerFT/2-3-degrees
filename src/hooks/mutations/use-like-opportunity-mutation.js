/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const LIKE_OPPORTUNITY = gql`
  mutation MyMutation(
    $clientMutationId: String!
    $profileId: ID!
    $opportunityIds: [TalentProfileLikedOpportunitiesNodeInput]
  ) {
    updateTalentProfile(
      input: {
        clientMutationId: $clientMutationId
        id: $profileId
        likedOpportunities: { nodes: $opportunityIds, append: false }
      }
    ) {
      clientMutationId
      talentProfile {
        likedOpportunities {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const useLikeOpportunityMutation = () => {
  const [mutation, mutationResults] = useMutation(LIKE_OPPORTUNITY);
  return { mutation, results: mutationResults };
};
