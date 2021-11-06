/**
 * External dependencies
 */
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
/**
 * Internal dependencies
 */
// import { useUserJobsDataQuery } from '../../../hooks/queries/use-user-jobs-data-query'
import { MyJobCard } from '../job-card/MyJobCard';
import { JobsCardContainer } from '../JobsCardContainer';
import { MySpinner } from '../../waiting/MySpinner';
import { MyError } from '../../waiting/MyError';

const GET_JOBS_BY_VIEWER = gql`
  query MyJobsQuery {
    viewer {
      id
      jobPosts(where: { status: DRAFT }) {
        nodes {
          id
          title
          uri
          status
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
  }
`;

export const MyDraftJobsList = () => {
  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_JOBS_BY_VIEWER);

  if (error) return <MyError error={`Error: ${error}`} />;
  if (!data && loading) return <MySpinner />;
  // if (!data) return <MyError error="No Opportunities here, see 'Awaiting Verification'"/>
  // if(data.viewer?.jobPosts?.nodes.length === 0) return <MyError error="No Opportunities here, see Verified"/>

  return (
    <Box>
      <Box
        w="100%"
        bg="gray.700"
        color="gray.50"
        py="3"
        mt={{ base: '12', sm: '12', md: '3' }}
        mb="3"
      >
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Awaiting Verification
        </Text>
      </Box>
      {!data || data.viewer?.jobPosts?.nodes.length === 0 ? (
        <MyError error="No Opportunities here" />
      ) : (
        <JobsCardContainer>
          {data.viewer?.jobPosts?.nodes.map((post) => (
            <MyJobCard
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
