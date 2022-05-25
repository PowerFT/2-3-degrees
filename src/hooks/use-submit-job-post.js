/**
 * External dependencies
 */
import { useState } from 'react';
// import { decodeEntities } from '@wordpress/html-entities';
// import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
} from './mutations';

/**
 * Hook which submits content via the API.
 *
 */
export const useSubmitJobPost = (formType) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState(null);
  const { mutation: createJobPost } = useCreateJobPostMutation();
  const { mutation: updateJobPost } = useUpdateJobPostMutation();

  const submitJobPost = (props) => {
    setSubmitLoading(true);

    const successCreate = (result) => {
      setSubmitLoading(false);
      return result.data;
    };
    const successUpdate = (result) => {
      setSubmitLoading(false);
      return result.data;
    };

    const fail = (errors) => {
      setSubmitLoading(false);
      setSubmitErrors(errors);
    };

    const {
      clientMutationId,
      id,
      title,
      companyName,
      jobType,
      jobLocation,
      sector,
      salary,
      salaryStructures,
      content,
      companyBio,
      closeDate,
      skills,
      jobApplicationQuestions,
      viewerId,
    } = props;

    switch (formType) {
      case 'create':
        return createJobPost({
          variables: {
            clientMutationId,
            title,
            companyName,
            jobType,
            jobLocation,
            sector,
            salary,
            salaryStructures,
            content,
            companyBio,
            closeDate,
            category: 'Job Post',
            skills,
            jobApplicationQuestions,
            status: 'DRAFT',
          },
        })
          .then(successCreate)
          .catch(fail);
      case 'update':
        return updateJobPost({
          variables: {
            clientMutationId,
            id,
            title,
            companyName,
            jobType,
            jobLocation,
            sector,
            salary,
            salaryStructures,
            content,
            companyBio,
            closeDate,
            skills,
            jobApplicationQuestions,
            status: 'DRAFT',
          },
        })
          .then(successUpdate)
          .catch(fail);
      case 'like':
        return updateJobPost({
          variables: {
            clientMutationId,
            id,
            like: viewerId,
          },
        });
    }

    return Promise.reject();
  };

  return {
    submitJobPost,
    submitLoading,
    submitErrors,
  };
};
