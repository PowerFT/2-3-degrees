import { Avatar, Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';

const GET_APPLICATIONS = gql`
  query MyQuery($id: [String]) {
    applications(
      where: {
        taxQuery: {
          taxArray: {
            taxonomy: APPLIEDJOB
            terms: $id
            field: NAME
            operator: AND
          }
        }
      }
    ) {
      nodes {
        id
      }
    }
  }
`;

export const MyJobCard = ({ title, sector, companyName, status, id }) => {
  const [applications, setApplications] = useState([]);

  const {
    data: appData,
    error: appError,
    loading: appLoading,
  } = useQuery(GET_APPLICATIONS, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (appData && !appLoading) setApplications(appData.applications.nodes);
  }, [appData]);

  useEffect(() => {}, [applications]);

  return (
    <Box
      position="relative"
      maxW="xl"
      minW={{ base: 'unset', md: 'xs', lg: 'sm' }}
      overflow="hidden"
      borderRadius="md"
      width="100%"
    >
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        px={{ base: '3', sm: '6' }}
        py={{ base: '5', sm: '7' }}
        w="100%"
      >
        <Stack id="jobCardContainer" align="flex-start" direction="row">
          <Avatar
            size="md"
            name={companyName}
            mr={{ base: '2', sm: '6' }}
            ml="0"
          />
          <Box ml="30px">
            <HStack align="flex-start" justify="space-between" mb="1.5">
              <VStack align="flex-start">
                <Text fontSize="3xl" as="h2" fontWeight="400">
                  {title}
                </Text>
                <HStack
                  spacing={{
                    base: '1',
                    md: '4',
                  }}
                  direction={{
                    base: 'column',
                    md: 'row',
                  }}
                  fontSize={{
                    base: 'md',
                    md: 'lg',
                  }}
                >
                  <Text as="h3" fontSize="2xl" color="gray.600">
                    {companyName}
                  </Text>
                  <Text
                    as="h3"
                    fontSize="2xl"
                    color="gray.600"
                    fontWeight="light"
                  >
                    {sector}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Stack>

        <ButtonGroup size="sm" isAttached variant="outline" w="100%" mt="4">
          <Button mr="-px" w="100%" as={Link} to={`/maker/jobs/edit?job=${id}`}>
            Edit
          </Button>
          <Button
            w="100%"
            as={Link}
            display={status === 'publish' ? 'flex' : 'none'}
            to={`/connect/jobs/${id}`}
          >
            View
          </Button>
        </ButtonGroup>

        {applications.length !== 0 ? (
          <Button
            loading={appLoading}
            disabled={appLoading}
            mt="2"
            w="100%"
            size="sm"
            variant="outline"
            as={Link}
            display={status === 'publish' ? 'flex' : 'none'}
            to={`/maker/jobs/${id}/applications`}
          >
            {`Applications (${applications.length})`}
          </Button>
        ) : (
          <Button
            loading={appLoading}
            disabled={appLoading}
            mt="2"
            w="100%"
            size="sm"
            variant="outline"
            as={Link}
            display={status === 'publish' ? 'flex' : 'none'}
          >
            No applications yet
          </Button>
        )}

        <Box
          position="absolute"
          bottom="0px"
          top="0px"
          right="0px"
          w="4px"
          bg="dyellow.200"
        />
      </Box>

      <Box
        position="absolute"
        bottom="0px"
        top="0px"
        right="0px"
        w="4px"
        bg="dYellow.200"
      />
    </Box>
  );
};
