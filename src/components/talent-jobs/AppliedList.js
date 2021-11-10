/**
 * External dependencies
 */
import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
/**
 * Internal dependencies
 */
import { useAuth } from '../../hooks';
import { MyError } from '../waiting/MyError';
import { MySpinner } from '../waiting/MySpinner';
import { JobsCardContainer } from '../jobs/JobsCardContainer';
import { LikedJobCard } from '../jobs/job-card/LikedJobCard';

const GET_JOB_POST_DATA = gql`
  query JobPostQuery($appliedDatabaseIds: [ID]) {
    jobPosts(where: { in: $appliedDatabaseIds }) {
      nodes {
        id
        databaseId
        title
        uri
        salary
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
        jobLocation {
          nodes {
            name
          }
        }
        companyName {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const AppliedList = () => {
  const [appliedDatabaseIds, setAppliedDatabaseIds] = useState([]);
  const { viewer, loadingViewer } = useAuth();

  useEffect(() => {
    if (viewer && !loadingViewer) {
      console.log(viewer);
      let appliedOppDatabaseIds = viewer.applications?.nodes?.map(
        (node) => node.appliedJobs.nodes[0].description
      );
      setAppliedDatabaseIds(
        appliedOppDatabaseIds !== 0 ? appliedOppDatabaseIds : ['']
      );
    }
  }, [viewer]);

  const { loading, error, data } = useQuery(GET_JOB_POST_DATA, {
    variables: {
      appliedDatabaseIds,
    },
  });

  if (error) return <MyError error={`Error: ${error}`} />;
  if (!data && loading && !viewer) return <MySpinner />;
  // if (!data) return <MyError error="No Opportunities here, see 'Awaiting Verification'"/>
  // if(data.viewer?.jobPosts?.nodes.length === 0) return <MyError error="No Opportunities here, see 'Awaiting Verification'"/>

  console.log(data);
  // console.log(
  //   viewer.talentProfiles.nodes[0].likedOpportunities.nodes.map(
  //     (node) => node.name
  //   )
  // );
  return (
    <Box>
      <Box w="100%" bg="gray.700" color="gray.50" py="3" my="3">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Applied Jobs
        </Text>
      </Box>
      {!data || data.jobPosts?.nodes.length === 0 ? (
        <MyError error="You haven't liked any posts yet!" />
      ) : (
        <JobsCardContainer>
          {data.jobPosts?.nodes.map((post) => (
            <LikedJobCard
              key={post?.id}
              title={post?.title}
              jobLocation={post?.jobLocation?.nodes[0]?.name}
              jobType={post?.jobType?.nodes[0]?.name}
              sector={post?.sector?.nodes[0]?.name}
              salary={post?.salary}
              companyName={post?.companyName?.nodes[0]?.name}
              jobPostLink={post?.uri}
              status={post?.status}
              content={post?.content}
              id={post?.id}
            />
          ))}
        </JobsCardContainer>
      )}
    </Box>
  );
};
