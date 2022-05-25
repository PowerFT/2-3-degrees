/**
 * External dependencies
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLikeOpportunityMutation } from './mutations/use-like-opportunity-mutation';

export const useLikeOpportunity = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const { mutation: LikeOpportunityMutation } = useLikeOpportunityMutation();

  const likeOpportunity = ({ opportunityIds, profileId }) => {
    setStatus('resolving');
    setError(null);

    const success = (result) => {
      setStatus('resolved');
      return result.data;
    };

    const fail = (errors) => {
      setStatus('resolved');
      setError(errors);
    };

    return LikeOpportunityMutation({
      variables: {
        clientMutationId: uuidv4(),
        profileId,
        opportunityIds,
      },
    })
      .then(success)
      .catch(fail);
  };

  return {
    likeOpportunity,
    error,
    status,
  };
};
