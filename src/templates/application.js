import React from 'react';
import { graphql, Link } from 'gatsby';
import { gql, useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import { Content } from '../components/layout/Content';
import { MyError } from '../components/waiting/MyError';
import { MySpinner } from '../components/waiting/MySpinner';
import { BreadCrumb } from '../components/Breadcrumb';
import { InnerSidebar } from '../components/layout/InnerSidebar';
import { ApplicationTable } from '../components/jobs/applications/ApplicationTable';

const GET_APPLICANT_DATA = gql`
  query MyQuery($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const ApplicationTemplate = ({
  pageContext,
  data: { application, talentProfile },
}) => {
  console.log(pageContext);
  console.log(application);
  console.log(talentProfile);
  // console.log(applicantProfile)
  const applicantId = pageContext.applicantId;
  const jobId = pageContext.jobId;

  console.log(applicantId, jobId);

  const tp = talentProfile?.talentProfile;
  const q = application;

  const { data, loading, error } = useQuery(GET_APPLICANT_DATA, {
    variables: {
      id: applicantId,
    },
  });

  if (error) {
    return <MyError error={error} />;
  }
  if (loading) {
    return <MySpinner />;
  }
  if (!data) {
    return <MyError error={'Sorry, no application found'} />;
  }

  return (
    <Flex w="100%">
      <InnerSidebar applicantEmail={tp?.email} pagetype="application" />

      <Content bg="gray.200" py="24" px="4">
        <BreadCrumb
          current={{ name: `${tp?.firstName} ${tp?.lastName}` }}
          previous={{
            name: 'Applications',
            link: `/maker/jobs/${jobId}/applications`,
          }}
          origin={{ name: 'My Opportunities', link: '/maker/jobs' }}
        />
        <ApplicationTable tp={tp} q={q} />
      </Content>
    </Flex>
  );
};

export default ApplicationTemplate;

export const applicationQuery = graphql`
  query MyQuery($applicantId: String = "", $jobId: String = "") {
    application: wpApplication(
      appliedJobs: { nodes: { elemMatch: { name: { eq: $jobId } } } }
      jobApplicants: { nodes: { elemMatch: { name: { eq: $applicantId } } } }
    ) {
      answer1
      answer2
      answer3
      answer4
    }
    talentProfile: wpTalentProfile(
      author: { node: { id: { eq: $applicantId } } }
    ) {
      talentProfile {
        firstName
        lastName
        dob
        postcode
        email
        gcse {
          gcseInstitution
          gcseSubjects
          gcseEndDate
        }
        alevels {
          alevelsInstitution
          alevelsSubjects
          alevelsEndDate
        }
        undergraduate {
          undergraduateInstitution
          undergraduateSubjects
          undergraduateEndDate
        }
        masters {
          mastersInstitution
          mastersSubjects
          mastersEndDate
        }
        btec {
          btecInstitution
          btecSubjects
          btecEndDate
        }
        vocational {
          vocationalInstitution
          vocationalSubjects
          vocationalEndDate
        }
        tlevel {
          tlevelInstitution
          tlevelSubjects
          tlevelEndDate
        }
        workExperienceOne {
          we1Company
          we1Role
          we1Start
          we1End
        }
        workExperienceTwo {
          we2Company
          we2Role
          we2Start
          we2End
        }
        workExperienceThree {
          we3Company
          we3Role
          we3Start
          we3End
        }
        workExperienceFour {
          we4Company
          we4Role
          we4Start
          we4End
        }
        workExperienceFive {
          we5Company
          we5Role
          we5Start
          we5End
        }
      }
    }
  }
`;
