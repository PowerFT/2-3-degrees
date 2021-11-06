import React from 'react';
import {
  Text,
  Button,
  HStack,
  Stack,
  Spacer,
  VStack,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  Icon,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks';
import { Link } from 'gatsby';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export const JobSidebar = (props) => {
  const {
    jobDatabaseId,
    jobId,
    salary,
    jobLocation,
    sector,
    jobSkills,
    jobType,
    closeDate,
    companyBio,
    companyName,
    salaryStructures,
    handleClick,
    toBeLiked,
    thisJobAppliedFor,
    ...rest
  } = props;
  const formattedSalary = parseInt(salary).toLocaleString();

  // const parsedDate = new Date(closeDate);
  const { viewer, loadingViewer } = useAuth();

  console.log(thisJobAppliedFor);

  return (
    <>
      <Box fontSize="lg" w="full" {...rest}>
        <HStack justify="space-between" align="flex-start">
          <Text fontWeight="700" letterSpacing="widest" pt="1" fontSize="xs">
            KEY SKILLS:
          </Text>
          {jobSkills.length !== 0 && (
            <VStack spacing="2" align="flex-end">
              {jobSkills?.map((skill, i) => (
                <HStack key={i}>
                  <Flex
                    align="center"
                    bg="dYellow.300"
                    _hover={{ bg: 'dYellow.400' }}
                    rounded="full"
                    pt="1"
                    pb="0.5"
                    px="3"
                  >
                    <Text
                      cursor="default"
                      fontWeight="700"
                      letterSpacing="widest"
                      fontSize="xs"
                      color="gray.50"
                    >
                      {skill.name.toLocaleUpperCase()}
                    </Text>
                  </Flex>
                </HStack>
              ))}
            </VStack>
          )}
        </HStack>
        <Stack
          wrap="wrap"
          spacing="2"
          align="flex-start"
          mt={jobSkills.length !== 0 ? '4' : '0'}
          w="full"
        >
          <HStack
            bg="gray.50"
            px="1"
            py="1"
            spacing="1"
            rounded="full"
            w="full"
          >
            <Flex
              align="center"
              bg="dBlue.300"
              rounded="full"
              pt="1"
              pb="0.5"
              px="2.5"
            >
              <Text
                fontWeight="700"
                letterSpacing="widest"
                fontSize="xs"
                color="#e8fffe"
              >
                SALARY:
              </Text>
            </Flex>
            <Text px="1" fontSize="sm">
              £{formattedSalary}/{salaryStructures}
            </Text>
          </HStack>
          <HStack
            bg="gray.50"
            px="1"
            py="1"
            spacing="1"
            rounded="full"
            w="full"
          >
            <Flex
              align="center"
              bg="dYellow.300"
              rounded="full"
              pt="1"
              pb="0.5"
              px="2.5"
            >
              <Text
                fontWeight="700"
                letterSpacing="widest"
                fontSize="xs"
                color="#fff6e3"
              >
                LOCATION:
              </Text>
            </Flex>
            <Text px="1" fontSize="sm">
              {jobLocation}
            </Text>
          </HStack>
          <HStack
            bg="gray.50"
            px="1"
            py="1"
            spacing="1"
            rounded="full"
            w="full"
          >
            <Flex
              align="center"
              bg="dOrange.300"
              rounded="full"
              pt="1"
              pb="0.5"
              px="2.5"
            >
              <Text
                fontWeight="700"
                letterSpacing="widest"
                fontSize="xs"
                color="#ffe6d4"
              >
                CONTRACT:
              </Text>
            </Flex>
            <Text px="1" fontSize="sm">
              {jobType}
            </Text>
          </HStack>
        </Stack>
      </Box>

      <Stack
        direction="column"
        spacing={4}
        mt="4"
        align="center"
        alignItems="stretch"
        w="full"
      >
        <Flex
          p="0"
          w="100%"
          bg="gray.50"
          border="2px solid"
          borderColor="gray.700"
        >
          <Flex align="center" px="2" py="1" bg="gray.700" w="fit-content">
            <Text
              color="gray.200"
              fontWeight="700"
              letterSpacing="widest"
              fontSize="xs"
            >
              DEADLINE:
            </Text>
          </Flex>
          <Box px="2" py="1" bg="gray.50">
            <Text>{closeDate}</Text>
          </Box>
        </Flex>

        {viewer &&
          !loadingViewer &&
          viewer.roles.nodes[0].name === 'talent' &&
          viewer.talentProfiles.nodes.length !== 0 && (
            <>
              <Button
                // disabled={toBeLiked}
                leftIcon={
                  toBeLiked ? (
                    <Icon as={AiOutlineHeart} h="6" w="6" />
                  ) : (
                    <Icon as={AiFillHeart} h="6" w="6" />
                  )
                }
                size="md"
                w="sm"
                color={toBeLiked ? 'gray.700' : 'gray.400'}
                bg={toBeLiked ? 'dYellow.300' : 'gray.300'}
                rounded="full"
                variant="solid"
                w="full"
                _hover={toBeLiked ? { bg: 'dYellow.200' } : { bg: 'gray.300' }}
                onClick={handleClick}
              >
                {toBeLiked ? 'Like' : 'Liked'}
              </Button>

              {}

              {thisJobAppliedFor ? (
                <Button
                  size="md"
                  disabled
                  w="sm"
                  color="gray.200"
                  bg="gray.700"
                  rounded="full"
                  variant="solid"
                  w="full"
                >
                  Applied
                </Button>
              ) : (
                <LinkBox>
                  <Button
                    size="md"
                    w="sm"
                    color="gray.200"
                    bg="gray.700"
                    rounded="full"
                    variant="solid"
                    w="full"
                    _hover={{ bg: 'gray.600' }}
                  >
                    <LinkOverlay
                      as={Link}
                      to={`/talent/jobs/apply/?job=${jobId}`}
                    >
                      Apply
                    </LinkOverlay>
                  </Button>
                </LinkBox>
              )}
            </>
          )}
      </Stack>

      <Spacer />

      <Box
        p="0"
        w="100%"
        bg="gray.50"
        border="2px solid"
        borderColor="gray.700"
      >
        <Box
          px="2"
          py="1"
          bg="gray.700"
          w="fit-content"
          color="dBlue.300"
          fontSize="xs"
          fontWeight="500"
        >
          ORGANISATION BIO
        </Box>
        <Box px="2" py="2" bg="gray.50">
          <Text fontSize="md" fontWeight="500">
            {companyName}
          </Text>
          <Text>{companyBio}</Text>
        </Box>
      </Box>
    </>
  );
};
