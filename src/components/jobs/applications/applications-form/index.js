/**
 * External dependencies
 */
import React, { useEffect, useState } from 'react';
import { Flex, Button, Text, Heading, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { gql, useQuery } from '@apollo/client';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
/**
 * Internal dependencies
 */
import { useAuth } from '../../../../hooks';
import { useSubmitApplication } from '../../../../hooks/use-submit-application';
import { ApplicationQuestionsForm } from './ApplicationQuestionsForm';
import { Content } from '../../../layout/Content';
import { ApplicationTable } from '../ApplicationTable';
import { useTalentViewerQuery } from '../../../../hooks/queries/use-viewer-talent-query';
import { MyError } from '../../../waiting/MyError';
import { MySpinner } from '../../../waiting/MySpinner';
import { InnerSidebar } from '../../../layout/InnerSidebar';

const GET_JOB_DATABASE_ID = gql`
  query JobPostQuery($id: ID!) {
    jobPost(id: $id) {
      databaseId
    }
  }
`;

const getQueryString = (query) => {
  const fallback = '';
  if (query) {
    const queriedStr = queryString.parse(query);
    const { job } = queriedStr;
    // Ensure a valid expected value is passed
    if (job) {
      return job;
    }
    return fallback;
  }
  return fallback;
};

export const ApplicationForm = () => {
  // get job id from url
  const location = useLocation();
  const jobId = location.search ? getQueryString(location.search) : '';

  // get youth autofills
  const { viewer, loadingViewer } = useAuth();
  // const [applicant, setApplicant] = useState({});

  // mutate to WP
  const [formDeets, setFormDeets] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
  });

  //get database id
  const [jobDatabaseId, setJobDatabaseId] = useState(0);
  const { data, loading, error } = useQuery(GET_JOB_DATABASE_ID, {
    variables: {
      id: jobId,
    },
  });

  useEffect(() => {
    if (data) setJobDatabaseId(data.jobPost.databaseId.toString());
  }, [data]);

  const [tp, setTp] = useState({});
  // const [q, setQ] = useState({});

  const { submitApplication, submitLoading, submitErrors } =
    useSubmitApplication();

  function handleSubmit(e) {
    e.preventDefault();
    submitApplication({
      clientMutationId: uuidv4(),
      jobId,
      jobDatabaseId,
      ...formDeets,
    });
  }

  const {
    data: talentData,
    loading: loadingTalent,
    error: talentError,
    refetch: refetchTalent,
  } = useTalentViewerQuery();

  useEffect(() => {
    if (viewer) {
      setFormDeets({
        ...formDeets,
        applicantId: viewer?.id,
        name: `${viewer.firstName} ${viewer.lastName}`,
      });
    }
  }, [viewer, loadingViewer]);

  useEffect(() => {
    if (talentData) {
      // console.log(talentData.viewer.talentProfiles.nodes[0].talentProfile);
      setTp(talentData.viewer.talentProfiles.nodes[0].talentProfile);
    }
  }, [talentData]);

  console.log(formDeets);

  if (loadingViewer || !viewer || loading || loadingTalent) {
    return <MySpinner />;
  }
  if (talentError || error) return <MyError error={talentError || error} />;

  // console.log(data.jobPost.databaseId);

  return (
    <Flex>
      <InnerSidebar
        pagetype="application-form"
        previewPageLink={`/talent/jobs/apply/?job=${jobId}#preview`}
        applyPageLink={`/talent/jobs/apply/?job=${jobId}#applyBtn`}
        justify="center"
      />

      <Content justify="center" w="100%" mt="6" padding="8">
        <Box maxW="lg">
          <Heading mb="3">Opportunity Application Form</Heading>
          <Text mb="1">
            These are the questions that the maker of this opportunity wants you
            to answer.
          </Text>
          <Text mb="6" fontSize="xs">
            The details you previously filled out in the Account Section will be
            automatically added to your application. Please preview your
            application below.
          </Text>
        </Box>
        <form id="submitApplication" onSubmit={handleSubmit}>
          <ApplicationQuestionsForm
            jobId={jobId}
            formDeets={formDeets}
            setFormDeets={setFormDeets}
          />
          <ApplicationTable id="preview" tp={tp} q={formDeets} bg="gray.300" />
          <Flex w="100%" justify="center">
            <Button
              id="applyBtn"
              isLoading={submitLoading}
              loadingText="Submitting"
              alignSelf="flex-end"
              size="lg"
              type="submit"
              form="submitApplication"
              color="gray.50"
              mt="8"
              bg={'dBlue.300'}
              _hover={{ bg: 'dBlue.200' }}
              disabled={submitLoading}
            >
              Submit Application
            </Button>
          </Flex>
        </form>
      </Content>
    </Flex>
  );
};
