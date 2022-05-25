import React from 'react';
import { Link, graphql } from 'gatsby';

import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';
import {
  Box,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { BreadCrumb } from '../components/Breadcrumb';

const ApplicationArchive = ({ data }) => {
  const applications = data.allWpApplication.nodes;

  return (
    <>
      <Header
        title="Applications"
        subTitle="Find all the current application to your opportunity"
        pagetype="admin"
      />
      <Content pb="10">
        <BreadCrumb
          current={{
            name: 'Applications',
          }}
          origin={{ name: 'My Opportunities', link: '/maker/jobs' }}
        />
        <VStack spacing="4" mt="6">
          {applications?.map((application, i) => {
            const jobUri = application.appliedJobs.nodes[0].name;
            const applicantUri = application.jobApplicants.nodes[0].name;
            return (
              <LinkBox key={i}>
                <HStack
                  bg="gray.100"
                  w={{ base: 'xs', sm: 'sm', md: 'xl', lg: '2xl' }}
                  align="center"
                  py={{ base: '8', sm: '4' }}
                  px={{ base: '4' }}
                  rounded="lg"
                  shadow="xs"
                  _hover={{ shadow: 'md' }}
                >
                  <Flex
                    justify="center"
                    align="center"
                    w={{ base: '30px', md: '50px' }}
                    h={{ base: '30px', md: '50px' }}
                    rounded="full"
                    bg="dBlue.300"
                    mr={{ base: '2', md: '4' }}
                  >
                    {i + 1}
                  </Flex>
                  <Box mr="4">
                    <LinkOverlay
                      as={Link}
                      to={`/maker/jobs/${jobUri}/${applicantUri}`}
                    >
                      <Text fontWeight="500">{application.title}</Text>
                    </LinkOverlay>
                  </Box>
                  <Spacer />
                  <Box rounded="2xl" bg="gray.300" py="2" px="4">
                    <Text fontSize={{ base: '10px', md: 'xs' }}>
                      {application.date}
                    </Text>
                  </Box>
                </HStack>
              </LinkBox>
            );
          })}
        </VStack>
      </Content>
    </>
  );
};

export default ApplicationArchive;

export const archiveQuery = graphql`
  query WordPressApplicationArchive($jobId: String = "") {
    allWpApplication(
      filter: {
        appliedJobs: { nodes: { elemMatch: { name: { eq: $jobId } } } }
      }
    ) {
      nodes {
        title
        date(fromNow: true)
        appliedJobs {
          nodes {
            name
          }
        }
        jobApplicants {
          nodes {
            name
          }
        }
      }
    }
  }
`;
