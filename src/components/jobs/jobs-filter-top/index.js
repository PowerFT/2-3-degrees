import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/layout';
import { MySpinner } from '../../../components/waiting/MySpinner';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
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

export const JobsFilterTop = ({
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (error) return <p>{`Error: ${error}`}</p>; //change
  if (loading || !data) return <MySpinner />; //change

  return (
    <>
      <Button
        onClick={onOpen}
        fontWeight="medium"
        size="lg"
        bg="dBlue.300"
        color="gray.50"
        rounded="full"
        _hover={{ bg: 'dBlue.400' }}
      >
        Filter Opportunites
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          margin={{
            base: '3',
          }}
          zIndex="100"
        >
          <ModalHeader>Filter Opportunities</ModalHeader>
          <SimpleGrid
            columns={2}
            spacingX="2"
            spacingY="2"
            bg="whiteAlpha.800"
            px="6"
            pt="2"
            pb="2"
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
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <Accordion allowMultiple mt="2">
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          px="0"
                          bg={isExpanded && 'gray.50'}
                          _hover={{ bg: 'gray.50' }}
                        >
                          <Box flex="1" textAlign="left">
                            Location
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        p={0}
                        bg="gray.200"
                        maxH="200px"
                        overflow="auto"
                      >
                        {data.allJobLocation?.nodes.map((node) => (
                          <Box
                            key={node.id}
                            width="100%"
                            py="1"
                            px="1"
                            fontSize="sm"
                            cursor="pointer"
                            _hover={{ bg: 'gray.300' }}
                            _active={{
                              bg: '#dddfe2',
                              transform: 'scale(0.98)',
                              borderColor: '#bec3c9',
                            }}
                            onClick={() => {
                              locations.includes(node.name)
                                ? setLocations(
                                    locations.filter(
                                      (type) => type !== node.name
                                    )
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
                          px="0"
                          bg={isExpanded && 'gray.50'}
                          _hover={{ bg: 'gray.50' }}
                        >
                          <Box flex="1" textAlign="left">
                            Sectors
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        p={0}
                        bg="gray.200"
                        maxH="200px"
                        overflow="auto"
                      >
                        {data.allSector?.nodes.map((node) => (
                          <Box
                            key={node.id}
                            width="100%"
                            py="1"
                            px="1"
                            fontSize="sm"
                            cursor="pointer"
                            _hover={{ bg: 'gray.300' }}
                            _active={{
                              bg: '#dddfe2',
                              transform: 'scale(0.98)',
                              borderColor: '#bec3c9',
                            }}
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
            </Box>

            <Box mt="4">
              <Box flex="1" textAlign="left" fontWeight="400">
                Contract Type
              </Box>
              <Flex justify="flex-start" align="center" wrap="wrap" mt="2">
                {data.allJobType?.nodes.map((node) => (
                  <Box
                    key={node.id}
                    as="span"
                    cursor="pointer"
                    user-select="none"
                    color="gray.800"
                    textAlign="center"
                    mr="1"
                    mb="2"
                    rounded="full"
                    px={3}
                    fontWeight="500"
                    py={2}
                    fontSize="xs"
                    bg={active ? 'red.700' : 'gray.300'}
                    _hover={{
                      bg: 'gray.400',
                    }}
                    _active={{
                      bg: 'red.700',
                    }}
                    onClick={() => {
                      jobTypes.includes(node.name)
                        ? setJobTypes(
                            jobTypes.filter((type) => type !== node.name)
                          )
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
                {data.skills?.nodes.map((node) => (
                  <Box
                    key={node.id}
                    as="span"
                    cursor="pointer"
                    user-select="none"
                    color="gray.800"
                    textAlign="center"
                    mr="1"
                    mb="2"
                    rounded="full"
                    px={3}
                    fontWeight="500"
                    py={2}
                    fontSize="xs"
                    bg={active ? 'red.700' : 'gray.300'}
                    _hover={{
                      bg: 'gray.400',
                    }}
                    _active={{
                      bg: 'red.700',
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
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Filter Opportunities</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
