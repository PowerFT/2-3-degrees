/**
 * External dependencies
 */
import { navigate } from 'gatsby-link';
import { useState } from 'react';
// import { decodeEntities } from '@wordpress/html-entities';
// import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useDeleteJobPostMutation } from './mutations/use-delete-job-post-mutation';

export const useDeleteJobPost = (jobPostId) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { deleteJobPostMutation } = useDeleteJobPostMutation();

  const deleteJobPost = () => {
    setError(null);
    setStatus('resolving');
    return deleteJobPostMutation(jobPostId)
      .then(() => {
        setStatus('resolved');
        navigate('/maker/jobs');
      })
      .catch((errors) => {
        setError(errors);
        setStatus('resolved');
      });
  };

  return {
    deleteJobPost,
    error,
    status,
  };
};
