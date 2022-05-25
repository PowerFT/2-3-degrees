/**
 * External dependencies
 */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
/**
 * Internal dependencies
 */
import { JobCard } from '../../job-card';
import { MySpinner } from '../../../waiting/MySpinner';
import { JobsCardContainer } from '../../JobsCardContainer';
import { Alert, AlertIcon } from '@chakra-ui/react';

const GET_JOBS = gql`
  query MyQuery(
    $first: Int!
    $after: String
    $where: RootQueryToJobPostConnectionWhereArgs
  ) {
    jobPosts(first: $first, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          salary
          uri
          id
          content(format: RAW)
          companyName {
            nodes {
              name
            }
          }
          jobLocation {
            nodes {
              name
            }
          }
          jobType {
            nodes {
              name
            }
          }
          sector {
            nodes {
              name
            }
          }
          salaryStructures {
            nodes {
              name
              slug
            }
          }
          skills {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

const BATCH_SIZE = 100;

export const JobsBoardJobList = ({ locations, sectors, jobTypes, skills }) => {
  const obj = {
    jobLocations: {
      terms: locations,
      taxonomy: 'JOBLOCATION',
      operator: 'IN',
      field: 'NAME',
    },
    sectors: {
      terms: sectors,
      taxonomy: 'SECTOR',
      operator: 'IN',
      field: 'NAME',
    },
    jobTypes: {
      terms: jobTypes,
      taxonomy: 'JOBTYPE',
      operator: 'IN',
      field: 'NAME',
    },
    skills: { terms: skills, taxonomy: 'SKILL', operator: 'IN', field: 'NAME' },
  };

  let whereArr = [];

  for (const x in obj) {
    if (obj[x].terms.length !== 0) whereArr.push(obj[x]);
  }

  const where =
    !locations.length && !sectors.length && !jobTypes.length && !skills.length
      ? null
      : {
          taxQuery: {
            relation: 'AND',
            taxArray: whereArr,
          },
        };

  const { loading, error, data } = useQuery(GET_JOBS, {
    variables: {
      first: BATCH_SIZE,
      after: null,
      notifyOnNetworkStatusChange: true,
      where: where,
    },
  });

  if (error)
    return (
      <Alert status="warning">
        {' '}
        <AlertIcon />
        <p>{`Error: ${error}`}</p>
      </Alert>
    );
  if (!data && loading) return <MySpinner />;
  const jobPosts = data?.jobPosts?.edges.map((edge) => edge.node);

  return (
    <JobsCardContainer>
      {jobPosts.map((post) => (
        <JobCard
          key={post?.id}
          title={post?.title}
          jobLocation={post?.jobLocation?.nodes[0]?.name}
          jobType={post?.jobType?.nodes[0]?.name}
          sector={post?.sector?.nodes[0]?.name}
          salary={post?.salary}
          salaryStructures={post?.salaryStructures.nodes[0]?.slug}
          companyName={post?.companyName?.nodes[0]?.name}
          jobPostLink={post?.uri}
          status={post?.status}
          content={post?.content}
          id={post?.id}
          uri={post?.uri}
        />
      ))}
    </JobsCardContainer>
  );
};
