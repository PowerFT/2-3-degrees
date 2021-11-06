/**
 * External dependencies
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLikeOpportunityMutation } from './mutations/use-like-opportunity-mutation';
// import { decodeEntities } from '@wordpress/html-entities';
// import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
// import { useChangeTalentProfileMutation } from './mutations/use-change-talent-profile-mutation';

// const errorCodes = {
// 	invalid_username:
// 		'Invalid username or email address. Please check it and try again.',
// 	invalid_email: 'Invalid email address. Please check it and try again.',
// 	incorrect_password:
// 		'Incorrect password. Please try again, or reset your password.',
// 	empty_username: 'Please provide your username.',
// 	empty_password: 'Please provide your password.',
// };

export const useLikeOpportunity = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const { mutation: LikeOpportunityMutation } = useLikeOpportunityMutation();

  const likeOpportunity = ({ opportunityIds, profileId }) => {
    console.log(opportunityIds, profileId);
    setError(null);
    // setStatus('resolved');

    const success = (result) => {
      console.log(result);
      setStatus('resolving');
      return result.data;
    };

    const fail = (errors) => {
      console.log(errors);
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
