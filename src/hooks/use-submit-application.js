/**
 * External dependencies
 */
import { navigate } from 'gatsby-link';
import { useState } from 'react';
import { useSubmitApplicationMutation } from './mutations/use-submit-application-mutation';

/**
 * Hook which submits content via the API.
 *
 */
export const useSubmitApplication = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState(null);
  const { mutation: createApplication } = useSubmitApplicationMutation();

  const submitApplication = (props) => {
    setSubmitLoading(true);

    const success = (result) => {
      setSubmitLoading(false);
      navigate('/talent/jobs');
    };

    const fail = (errors) => {
      setSubmitLoading(false);
      setSubmitErrors(errors);
    };

    const {
      clientMutationId,
      answer1,
      answer2,
      answer3,
      applicantId,
      jobId,
      jobDatabaseId,
      name,
    } = props;

    createApplication({
      variables: {
        clientMutationId,
        answer1,
        answer2,
        answer3,
        applicantId,
        jobId,
        jobDatabaseId,
        name,
      },
    })
      .then(success)
      .catch(fail);
  };

  return {
    submitApplication,
    submitLoading,
    submitErrors,
  };
};
