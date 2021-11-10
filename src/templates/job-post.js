import React, { useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';
import parse from 'html-react-parser';
// import { motion } from "framer-motion"
import { Box, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import {
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react';
import { InnerSidebar } from '../components/layout/InnerSidebar';
import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';
import {
  HiOutlineClock,
  HiOutlineCurrencyPound,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useAuth } from '../hooks';
import { useLikeOpportunity } from '../hooks/use-like-opportunity';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const BreadCrumb = ({ currentPage, ...rest }) => {
  return (
    <Breadcrumb
      spacing="1"
      w="fit-content"
      separator={<ChevronRightIcon color="gray.300" />}
    >
      <BreadcrumbItem m="0" {...rest}>
        <BreadcrumbLink
          as={Link}
          bg="gray.300"
          rounded="full"
          fontSize="sm"
          py=".5"
          px="3"
          to="/connect/platform"
        >
          Connect Platform
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem m="0">
        <BreadcrumbLink
          as={Link}
          to="/connect/jobs"
          fontSize="sm"
          bg="gray.300"
          rounded="full"
          py=".5"
          px="3"
        >
          Opportunity Board
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        m="0"
        isCurrentPage
        bg="gray.300"
        rounded="full"
        py=".5"
        px="3"
      >
        <Text maxW="120px" fontSize="sm" isTruncated>
          {currentPage}
        </Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const JobPostTemplate = ({ data: { jobPost } }) => {
  const title = jobPost?.title;
  const companyName = jobPost?.companyName?.nodes[0]?.name;
  const sector = jobPost?.sector?.nodes[0]?.name;
  const jobType = jobPost?.jobType?.nodes[0]?.name;
  const jobLocation = jobPost?.jobLocation?.nodes[0]?.name;
  const salary = jobPost?.salary;
  const companyBio = jobPost?.companyBio;
  const closeDate = jobPost?.closeDate;
  const content = jobPost?.content;
  const salaryStructures = jobPost?.salaryStructures?.nodes[0]?.name;
  const skills = jobPost?.skills?.nodes;
  const id = jobPost?.id;
  const jobDatabaseId = jobPost?.databaseId;
  const dbIdString = jobPost?.databaseId.toLocaleString().replace(/,/g, '');
  // const id = jobPost?.slug;

  const { viewer, refetchViewer, loadingViewer } = useAuth();
  const pagetype = 'job-post';
  const formattedSalary = parseInt(salary).toLocaleString();

  const [likes, setLikes] = useState([]);
  const [toBeLiked, setToBeLiked] = useState(true);
  const [profileId, setProfileId] = useState('');
  const [thisJobAppliedFor, setThisJobAppliedFor] = useState(false);
  // const [likePressed, setLikePressed] = useState(false);

  useEffect(() => {
    if (viewer && !loadingViewer) {
      const likedOpportunities =
        viewer.talentProfiles.nodes[0]?.likedOpportunities.nodes;
      const likedOpps = likedOpportunities?.map((opp) => opp.name) || [];
      // setLikes(likedOpps)
      // console.log(likedOpportunities);
      // console.log(likedOpps);
      if (likedOpps?.includes(dbIdString)) {
        let newArr = likedOpps.filter((opp) => opp !== dbIdString);
        let toSend = newArr.map((item) => {
          return { name: item };
        });
        setLikes(toSend);
      } else if (!likedOpps?.includes(dbIdString) && likedOpps.length !== 0) {
        let toSend = [
          ...likedOpps?.map((item) => ({ name: item })),
          { name: dbIdString },
        ];
        setLikes(toSend);
      } else {
        setLikes([{ name: dbIdString }]);
      }

      setProfileId(viewer.talentProfiles.nodes[0]?.id);
      // console.log(viewer);

      //Has this job been applied for before?

      const jobsApplied = viewer.applications.nodes.map(
        (node) => node.appliedJobs
      );
      const jobsAppliedId = jobsApplied.map((nodes) => nodes.nodes[0].name);
      const thisJobAppliedFor = jobsAppliedId.includes(id);

      if (thisJobAppliedFor) {
        setThisJobAppliedFor(true);
      }
      // console.log(jobsApplied);
      // console.log(jobsAppliedId);
      // console.log(thisJobAppliedFor);
    }
  }, [viewer]);

  useEffect(() => {
    setToBeLiked(likes?.map((like) => like.name).includes(dbIdString));
  }, [likes]);

  // const handleSkillClick = (skill) => {
  //   if(!selectedSkills.includes(skill)) {
  //     setFormDeets({
  //       ...formDeets,
  //       skills: [...formDeets.skills, {name: skill}],
  //     })
  //   } else if(selectedSkills.includes(skill)) {
  //     setFormDeets({
  //       ...formDeets,
  //       skills: formDeets?.skills.filter(newskill => newskill.name !== skill),
  //     })
  //   } else {
  //     return
  //   }
  // }

  const {
    likeOpportunity,
    error: likeError,
    status: likeStatus,
  } = useLikeOpportunity();

  const handleLikeClick = () => {
    const likedDeets = {
      profileId,
      opportunityIds: likes,
    };

    likeOpportunity(likedDeets)
      .then(() => {
        refetchViewer();
      })
      .catch((err) => console.log(err));
  };

  // console.log(likeStatus);

  return (
    <>
      <Header
        title={title}
        subTitle={companyName}
        avatar={companyName}
        pagetype={pagetype}
      />
      <Flex w="100%">
        <InnerSidebar
          jobLocation={jobLocation}
          sector={sector}
          jobType={jobType}
          jobSkills={skills}
          salary={salary}
          pagetype={pagetype}
          companyBio={companyBio}
          closeDate={closeDate}
          companyName={companyName}
          salaryStructures={salaryStructures}
          jobId={id}
          jobDatabaseId={jobDatabaseId}
          handleClick={handleLikeClick}
          toBeLiked={toBeLiked}
          thisJobAppliedFor={thisJobAppliedFor}
          likeStatus={likeStatus}
        />

        <Content mt="5" p="4">
          <Box maxW="xl" w="100%">
            <BreadCrumb currentPage={title} justifySelf="flex-start" />
          </Box>

          <Box
            py="6"
            px="8"
            mt="5"
            maxW="xl"
            w="100%"
            bg="gray.300"
            display={{ base: 'block', md: 'none' }}
          >
            <Box fontSize="lg" w="full">
              <HStack
                align={{ base: 'flex-start', md: 'center' }}
                justify="space-between"
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Text fontWeight="700" letterSpacing="widest" fontSize="xs">
                  KEY SKILLS:
                </Text>
                {skills.length !== 0 && (
                  <HStack spacing="2" align="flex-start" marginLeft="0">
                    {skills?.map((skill, i) => (
                      <HStack key={i}>
                        <Box
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
                            fontSize={{ base: '9px', md: 'xs' }}
                            color="gray.50"
                          >
                            {skill.name.toLocaleUpperCase()}
                          </Text>
                        </Box>
                        {/* <Icon as={HiOutlineHand} w={8} h={8}/> */}
                        {/* <Text>{skill.name}</Text> */}
                      </HStack>
                    ))}
                  </HStack>
                )}
              </HStack>
              <Stack
                wrap="wrap"
                spacing="2"
                align="flex-start"
                mt={skills.length !== 0 ? '4' : '0'}
                w="full"
              >
                <HStack
                  bg="gray.50"
                  px="1"
                  py="0.5"
                  spacing="1"
                  rounded="full"
                  w="full"
                >
                  <Icon as={HiOutlineCurrencyPound} w={8} h={8} />
                  <Flex
                    align="center"
                    bg="dBlue.300"
                    rounded="full"
                    pt="1"
                    pb="0.5"
                    px="3"
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
                  <Text px="2" fontSize="md">
                    £{formattedSalary}/{salaryStructures}
                  </Text>
                </HStack>
                <HStack
                  bg="gray.50"
                  px="1"
                  py="0.5"
                  spacing="1"
                  rounded="full"
                  w="full"
                >
                  <Icon as={HiOutlineLocationMarker} w={8} h={8} />
                  <Flex
                    align="center"
                    bg="dYellow.300"
                    rounded="full"
                    pt="1"
                    pb="0.5"
                    px="3"
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
                  <Text px="2" fontSize="md">
                    {jobLocation}
                  </Text>
                </HStack>
                <HStack
                  bg="gray.50"
                  px="1"
                  py="0.5"
                  spacing="1"
                  rounded="full"
                  w="full"
                >
                  <Icon as={HiOutlineClock} w={8} h={8} />
                  <Flex
                    align="center"
                    bg="dOrange.300"
                    rounded="full"
                    pt="1"
                    pb="0.5"
                    px="3"
                  >
                    <Text
                      fontWeight="700"
                      letterSpacing="widest"
                      fontSize="xs"
                      color="#ffe6d4"
                    >
                      CONTRACT TYPE:
                    </Text>
                  </Flex>
                  <Text px="2" fontSize="md">
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
                // border="2px solid"
                rounded="md"
                borderColor="gray.700"
              >
                <Flex
                  align="center"
                  px="2"
                  py="1"
                  bg="gray.700"
                  w="fit-content"
                >
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
                            to={`/talent/jobs/apply/?job=${id}`}
                          >
                            Apply
                          </LinkOverlay>
                        </Button>
                      </LinkBox>
                    )}

                    <Button
                      isLoading={likeStatus === 'resolving'}
                      disabled={likeStatus === 'resolving'}
                      leftIcon={
                        likes?.map((like) => like.name).includes(dbIdString) ? (
                          <Icon as={AiOutlineHeart} h="6" w="6" />
                        ) : (
                          <Icon as={AiFillHeart} h="6" w="6" />
                        )
                      }
                      size="md"
                      w="sm"
                      color={
                        likes?.map((like) => like.name).includes(dbIdString)
                          ? 'gray.700'
                          : 'gray.400'
                      }
                      bg={
                        likes?.map((like) => like.name).includes(dbIdString)
                          ? 'dYellow.300'
                          : 'gray.200'
                      }
                      rounded="full"
                      variant="solid"
                      w="full"
                      _hover={
                        likes?.map((like) => like.name).includes(dbIdString)
                          ? { bg: 'dYellow.200' }
                          : { bg: 'gray.100' }
                      }
                      onClick={handleLikeClick}
                    >
                      {likes.map((like) => like.name).includes(dbIdString)
                        ? 'Like'
                        : 'Liked'}
                    </Button>
                  </>
                )}
            </Stack>
          </Box>

          <Box
            mt="10"
            borderRadius="lg"
            maxW="xl"
            bg="white"
            p="10"
            mb="12"
            w={{ base: '100%', sm: '100%', lg: 'xl' }}
          >
            {content && <Box className="wp-content">{parse(content)}</Box>}
          </Box>
        </Content>
      </Flex>
    </>
  );
};

export default JobPostTemplate;

export const jobPostQuery = graphql`
  query JobPostQuery($id: String!) {
    jobPost: wpJobPost(id: { eq: $id }) {
      closeDate
      companyBio
      content
      id
      databaseId
      salary
      status
      title
      uri
      sector {
        nodes {
          name
        }
      }
      jobType {
        nodes {
          name
        }
      }
      jobLocation {
        nodes {
          name
        }
      }
      skills {
        nodes {
          name
          id
        }
      }
      salaryStructures {
        nodes {
          name
        }
      }
      date(fromNow: true)
      companyName {
        nodes {
          name
        }
      }
    }
  }
`;
