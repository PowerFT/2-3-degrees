import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/layout';
import { MySpinner } from '../../../waiting/MySpinner';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';

const GET_META_DATA = gql`
  query MetaDataQuery {
    allJobLocation {
      nodes {
        name
        id
        parentId
        children {
          nodes {
            name
          }
        }
      }
    }
    allSector {
      nodes {
        name
        id
      }
    }
    allJobType {
      nodes {
        name
        id
      }
    }
    skills {
      nodes {
        name
        id
      }
    }
  }
`;

export const JobsFilter = ({
  setError,
  setLoading,
  locations,
  setLocations,
  sectors,
  setSectors,
  jobTypes,
  setJobTypes,
  skills,
  setSkills,
}) => {
  const { loading, error, data } = useQuery(GET_META_DATA);
  var active = false;

  const [filters, setFilters] = useState({
    locations: [],
    sectors: [],
    jobTypes: [],
    skills: [],
  });

  useEffect(() => {
    setFilters({
      locations,
      sectors,
      jobTypes,
      skills,
    });
  }, [locations, jobTypes, sectors, skills]);

  if (error) return <p>{`Error: ${error}`}</p>; //change
  if (loading || !data) return <MySpinner />;

  return (
    <>
      <SimpleGrid
        columns={2}
        spacingX="2"
        spacingY="2"
        bg="whiteAlpha.800"
        p="2"
        wrap="wrap"
        align="flex-start"
        justify="flex-start"
        border="1px solid grey.600"
        rounded="sm"
        w="100%"
      >
        {filters.locations.map((item, i) => (
          <HStack
            key={i}
            py="1"
            px="3"
            rounded="full"
            bg="blackAlpha.700"
            color="white"
            justify="space-between"
            w="fit-content"
          >
            <Text fontSize="11px">{item}</Text>
            <CloseIcon
              w={2}
              h={2}
              cursor="pointer"
              onClick={() => {
                locations.includes(item)
                  ? setLocations(locations.filter((type) => type !== item))
                  : setLocations([...locations, item]);
              }}
            />
          </HStack>
        ))}
        {filters.sectors.map((item, i) => (
          <HStack
            key={i}
            py="1"
            px="3"
            rounded="full"
            bg="blackAlpha.700"
            color="white"
            justify="space-between"
            w="fit-content"
          >
            <Text fontSize="11px">{item}</Text>
            <CloseIcon
              w={2}
              h={2}
              cursor="pointer"
              onClick={() => {
                sectors.includes(item)
                  ? setSectors(sectors.filter((type) => type !== item))
                  : setSectors([...sectors, item]);
              }}
            />
          </HStack>
        ))}
        {filters.jobTypes.map((item, i) => (
          <HStack
            key={i}
            py="1"
            px="3"
            rounded="full"
            bg="blackAlpha.700"
            color="white"
            justify="space-between"
            w="fit-content"
          >
            <Text fontSize="11px">{item}</Text>
            <CloseIcon
              w={2}
              h={2}
              cursor="pointer"
              onClick={() => {
                jobTypes.includes(item)
                  ? setJobTypes(jobTypes.filter((type) => type !== item))
                  : setJobTypes([...jobTypes, item]);
              }}
            />
          </HStack>
        ))}
        {filters.skills.map((item, i) => (
          <HStack
            key={i}
            py="1"
            px="3"
            size="xs"
            rounded="full"
            bg="blackAlpha.700"
            color="white"
            justify="space-between"
            w="fit-content"
          >
            <Text fontSize="11px">{item}</Text>
            <CloseIcon
              w={2}
              h={2}
              cursor="pointer"
              onClick={() => {
                skills.includes(item)
                  ? setSkills(skills.filter((type) => type !== item))
                  : setSkills([...skills, item]);
              }}
            />
          </HStack>
        ))}
      </SimpleGrid>
      <Accordion allowMultiple w="100%">
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  px="1"
                  bg={isExpanded && 'whiteAlpha.200'}
                  _hover={{ bg: 'whiteAlpha.700' }}
                >
                  <Box flex="1" textAlign="left">
                    Location
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" color="whiteAlpha.900" />
                  ) : (
                    <AddIcon fontSize="12px" color="whiteAlpha.900" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                p={0}
                bg="whiteAlpha.600"
                maxH="200px"
                overflow="auto"
              >
                {data.allJobLocation.nodes.map((node) => (
                  <Box
                    key={node.id}
                    width="100%"
                    py="1"
                    px="1"
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ bg: 'whiteAlpha.600' }}
                    onClick={() => {
                      locations.includes(node.name)
                        ? setLocations(
                            locations.filter((type) => type !== node.name)
                          )
                        : setLocations([...locations, node.name]);
                    }}
                  >
                    {node.name}
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  px="1"
                  bg={isExpanded && 'whiteAlpha.200'}
                  _hover={{ bg: 'whiteAlpha.700' }}
                >
                  <Box flex="1" textAlign="left">
                    Sectors
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" color="whiteAlpha.900" />
                  ) : (
                    <AddIcon fontSize="12px" color="whiteAlpha.900" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                p={0}
                bg="whiteAlpha.600"
                maxH="200px"
                overflow="auto"
              >
                {data.allSector.nodes.map((node) => (
                  <Box
                    key={node.id}
                    width="100%"
                    py="1"
                    px="1"
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ bg: 'whiteAlpha.600' }}
                    onClick={() => {
                      sectors.includes(node.name)
                        ? setSectors(
                            sectors.filter((type) => type !== node.name)
                          )
                        : setSectors([...sectors, node.name]);
                    }}
                  >
                    {node.name}
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Box mt="4">
        <Box flex="1" textAlign="left" fontWeight="400">
          Contract Type
        </Box>
        <Flex justify="flex-start" align="center" wrap="wrap" mt="2">
          {data.allJobType.nodes.map((node) => (
            <Box
              key={node.id}
              as="span"
              cursor="pointer"
              user-select="none"
              bgColor="gray.700"
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="2xl"
              px={3}
              py={2}
              fontSize="xs"
              fontWeight="bold"
              bg={active ? 'red.700' : 'gray.50'}
              _hover={{
                bg: 'gray.100',
              }}
              _active={{
                bg: 'gray.200',
              }}
              onClick={() => {
                jobTypes.includes(node.name)
                  ? setJobTypes(jobTypes.filter((type) => type !== node.name))
                  : setJobTypes([...jobTypes, node.name]);
              }}
            >
              {node.name}
            </Box>
          ))}
        </Flex>
      </Box>

      <Box mt="4">
        <Box flex="1" textAlign="left" fontWeight="400">
          Key Skills
        </Box>
        <Flex justify="flex-start" align="center" wrap="wrap" mt="2">
          {data.skills.nodes.map((node) => (
            <Box
              key={node.id}
              as="span"
              cursor="pointer"
              user-select="none"
              bgColor="gray.700"
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="2xl"
              px={3}
              py={2}
              fontSize="xs"
              fontWeight="bold"
              bg={active ? 'red.700' : 'gray.50'}
              _hover={{
                bg: 'gray.100',
              }}
              _active={{
                bg: 'gray.200',
              }}
              onClick={() => {
                skills.includes(node.name)
                  ? setSkills(skills.filter((type) => type !== node.name))
                  : setSkills([...skills, node.name]);
              }}
            >
              {node.name}
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};
