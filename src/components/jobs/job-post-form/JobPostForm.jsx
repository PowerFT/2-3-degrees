/**
 * External dependencies
 */
import React, { useEffect, useState } from 'react';
import {
  Text,
  InputLeftAddon,
  InputRightAddon,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  VStack,
  InputGroup,
  Flex,
  Box,
  HStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { graphql, StaticQuery } from 'gatsby';
/**
 * Internal dependencies
 */
import { FieldGroup } from './FieldGroup';
// import DatePicker from '../../DatePicker';
import { useSubmitJobPost } from '../../../hooks';
import { DangerZone } from './DangerZone';
import { useAuth } from '../../../hooks';
import { MySpinner } from '../../waiting/MySpinner';
import { MyError } from '../../waiting/MyError';
import { AdminBlob } from '../../AdminBlob';
import { UnderlineLink } from '../../user/UnderlineLink';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

export const JobPostForm = ({ formType, formDeets, setFormDeets, id }) => {
  const { submitJobPost, submitLoading, submitErrors } =
    useSubmitJobPost(formType);
  const { viewer, loadingViewer } = useAuth();

  const [submitted, setSubmitted] = useState(false);

  // const { getCheckboxProps } = useCheckboxGroup({
  //   defaultValue: ['ps5'],
  // })
  console.log(formDeets);
  const selectedSkills = formDeets?.skills?.map((skill) => skill.name);
  const selectedQuestions = formDeets?.jobApplicationQuestions?.map(
    (question) => question.slug
  );
  console.log(selectedQuestions);

  const handleSkillClick = (skill) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 3) {
      setFormDeets({
        ...formDeets,
        skills: [...formDeets.skills, { name: skill }],
      });
    } else if (selectedSkills.includes(skill)) {
      setFormDeets({
        ...formDeets,
        skills: formDeets?.skills.filter((newskill) => newskill.name !== skill),
      });
    } else {
      return;
    }
  };

  const handleQuestionClick = (questionSlug) => {
    // console.log(questionSlug)
    console.log(!selectedQuestions.includes(questionSlug), questionSlug);
    if (
      !selectedQuestions.includes(questionSlug) &&
      selectedQuestions.length < 3
    ) {
      console.log('add');
      setFormDeets({
        ...formDeets,
        jobApplicationQuestions: [
          ...formDeets.jobApplicationQuestions,
          { slug: questionSlug },
        ],
      });
    } else if (selectedQuestions.includes(questionSlug)) {
      console.log('filter');
      setFormDeets({
        ...formDeets,
        jobApplicationQuestions: formDeets?.jobApplicationQuestions.filter(
          (newquestion) => newquestion.slug !== questionSlug
        ),
      });
    } else {
      return;
    }
  };

  // useEffect(() => {
  //   console.log(formDeets.jobApplicationQuestions)
  // }, [formDeets])

  function handleSubmit(e) {
    e.preventDefault();
    submitJobPost({ clientMutationId: uuidv4(), ...formDeets })
      .then((res) => {
        // console.log(res);
        setSubmitted(true);
      })
      .catch((error) => {
        // console.log(error); //fix
      });
  }

  // const getUTCDate = (dateString = Date.now()) => {
  //   const date = new Date(dateString);

  //   return new Date(
  //     date.getUTCFullYear(),
  //     date.getUTCMonth(),
  //     date.getUTCDate(),
  //     date.getUTCHours(),
  //     date.getUTCMinutes(),
  //     date.getUTCSeconds()
  //   );
  // };

  // const utcDate = getUTCDate(formDeets.closeDate);
  // console.log(utcDate);

  if (loadingViewer || !viewer) {
    return <MySpinner />;
  }

  return (
    <Flex justify="center" w="100%">
      <form id="settings-form" onSubmit={handleSubmit}>
        <Stack spacing="6" justify="center" align="center" w={['xs', 'md']}>
          <AdminBlob title="Opportunity Information">
            <VStack width="full" spacing="6">
              <FormControl>
                <FormLabel htmlFor="jobTitleSelect">
                  Opportunity Title
                </FormLabel>
                <Input
                  disabled={submitLoading || submitted}
                  id="jobTitleSelect"
                  type="text"
                  value={formDeets.title}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      title: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobLocationSelect">Location</FormLabel>
                <Select
                  disabled={submitLoading || submitted}
                  id="jobLocationSelect"
                  placeholder="Select Location"
                  value={formDeets.jobLocation}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      jobLocation: e.target.value,
                    })
                  }
                >
                  <StaticQuery
                    query={META_QUERY}
                    render={(data) => {
                      if (data.allWpJobLocation) {
                        const locations = data.allWpJobLocation.nodes;

                        return (
                          <>
                            {locations &&
                              locations.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </>
                        );
                      }
                    }}
                  />
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobTypeSelect">Contract Type</FormLabel>
                <Select
                  disabled={submitLoading || submitted}
                  isRequired
                  id="jobTypeSelect"
                  placeholder="Select Job Type"
                  value={formDeets.jobType}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      jobType: e.target.value,
                    })
                  }
                >
                  <StaticQuery
                    query={META_QUERY}
                    render={(data) => {
                      if (data.allWpJobType) {
                        const jobTypes = data.allWpJobType.nodes;

                        return (
                          <>
                            {jobTypes &&
                              jobTypes.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </>
                        );
                      }
                    }}
                  />
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobSectorSelect">Sector</FormLabel>
                <Select
                  disabled={submitLoading || submitted}
                  isRequired
                  id="jobSectorSelect"
                  placeholder="Select Sector"
                  value={formDeets.sector}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      sector: e.target.value,
                    })
                  }
                >
                  <StaticQuery
                    query={META_QUERY}
                    render={(data) => {
                      if (data.allWpSector) {
                        const sectors = data.allWpSector.nodes;

                        return (
                          <>
                            {sectors &&
                              sectors.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </>
                        );
                      }
                    }}
                  />
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobTypeSelect">Salary Structure</FormLabel>
                <Select
                  disabled={submitLoading || submitted}
                  isRequired
                  id="salaryStructureSelect"
                  placeholder="Select Salary Structure"
                  value={formDeets.salaryStructures}
                  onChange={(e) => {
                    setFormDeets({
                      ...formDeets,
                      salaryStructures: e.target.value,
                    });
                    // setSalStructure(e.target.value)
                  }}
                >
                  <StaticQuery
                    query={META_QUERY}
                    render={(data) => {
                      if (data.allWpSalaryStructure) {
                        const salaryStructures =
                          data.allWpSalaryStructure.nodes;
                        return (
                          <>
                            {salaryStructures &&
                              salaryStructures.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </>
                        );
                      }
                    }}
                  />
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="jobSalarySelect">Salary</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="£" />
                  <Input
                    disabled={submitLoading || submitted}
                    id="jobSalarySelect"
                    type="number"
                    value={formDeets.salary}
                    onChange={(e) =>
                      setFormDeets({
                        ...formDeets,
                        salary: e.target.value,
                      })
                    }
                  />
                  <InputRightAddon
                    children={`/ ${
                      formDeets.salaryStructures?.toLocaleLowerCase() || ''
                    }`}
                  />
                </InputGroup>
                <FormHelperText>
                  Please do not use commas (e.g. 2000)
                </FormHelperText>
              </FormControl>
            </VStack>
          </AdminBlob>

          <AdminBlob>
            <Flex
              justify="flex-start"
              align="center"
              wrap="wrap"
              mt="2"
              justifyContent="center"
            >
              <StaticQuery
                query={META_QUERY}
                render={(data) => {
                  if (data.allWpSkill) {
                    const skills = data.allWpSkill.nodes;
                    return (
                      <Box w="100%" align="flex-start">
                        <Text fontWeight="700">Skills</Text>
                        <Text fontSize="xs">
                          Select a maximum of three skills that are required for
                          this opportunity.
                        </Text>
                        <Flex wrap="wrap" justify="center" mt="6">
                          {skills &&
                            skills.map((skill) => (
                              <Button
                                disabled={submitLoading || submitted}
                                key={skill.id}
                                as="span"
                                cursor="pointer"
                                user-select="none"
                                bg={
                                  selectedSkills.includes(skill.name)
                                    ? 'dBlue.200'
                                    : 'gray.300'
                                }
                                color="gray.700"
                                textAlign="center"
                                mr="1"
                                mb="2"
                                rounded="full"
                                px={3}
                                py={2}
                                fontSize="xs"
                                fontWeight="bold"
                                // bg={active ? "red.700" : "gray.50"}
                                // _active={active === skill}
                                onClick={() => handleSkillClick(skill.name)}
                              >
                                {skill.name}
                              </Button>
                            ))}
                        </Flex>
                      </Box>
                    );
                  }
                }}
              />
            </Flex>
          </AdminBlob>

          <AdminBlob title="Company Info">
            <VStack width="full" spacing="6">
              <FormControl isRequired>
                <FormLabel htmlFor="jobSalarySelect">
                  Organisation Name
                </FormLabel>
                <Input
                  disabled={submitLoading || submitted}
                  id="jobSalarySelect"
                  type="text"
                  value={formDeets.companyName}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      companyName: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobContentSelect">
                  Organisation Bio
                </FormLabel>
                <Textarea
                  disabled={submitLoading || submitted}
                  htmlFor="jobContentSelect"
                  rows={5}
                  value={formDeets.companyBio}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      companyBio: e.target.value,
                    })
                  }
                />
                {/* {formDeets.companyBio} */}
                {/* </Textarea> */}
                <FormHelperText>
                  Brief description for your organisation's account.
                </FormHelperText>
              </FormControl>

              {/* <Stack direction="row" spacing="6" align="center" width="full">
                <Avatar
                  size="xl"
                  name="Alyssa Mall"
                  src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                />
                <Box>
                  <HStack spacing="5">
                    <Button leftIcon={<HiCloudUpload />}>Change logo</Button>
                    <Button variant="ghost" colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                  <Text fontSize="sm" mt="3">
                    .jpg, .gif, or .png. Max file size 700K.
                  </Text>
                </Box>
              </Stack> */}
            </VStack>
          </AdminBlob>

          <AdminBlob title="Opportunity Description">
            <FormControl>
              <Textarea
                disabled={submitLoading || submitted}
                id="jobDescription Input"
                type="text"
                rows={15}
                value={formDeets.content}
                onChange={(e) =>
                  setFormDeets({
                    ...formDeets,
                    content: e.target.value,
                  })
                }
              >
                {/* {formDeets.content} */}
              </Textarea>
              <FormHelperText>
                Tell us more about the opportunity: expectations, outputs.
              </FormHelperText>
            </FormControl>

            {/* <FormControl isRequired>
              <FormLabel htmlFor="applicationLink">Application Link</FormLabel>
              <InputGroup>
                <InputLeftAddon children="https://" />
                <Input
                  disabled={submitLoading || submitted}
                  htmlFor="applicationLink"
                  type="text"
                  value={formDeets.applicationLink}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      applicationLink: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl> */}

            <FormControl isRequired>
              <FormLabel htmlFor="closeDateInput">Close Date</FormLabel>
              <Input
                disabled={submitLoading || submitted}
                value={formDeets.closeDate}
                placeholder="dd/mm/yy"
                onChange={(e) =>
                  setFormDeets({
                    ...formDeets,
                    closeDate: e.target.value,
                  })
                }
              />
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel htmlFor="closeDateInput">Close Date</FormLabel>
              <DatePicker 
              showTimeSelect={false}
                selected={utcDate} 
                isClearable={true} 
                // value={formDeets.closeDate}
                onChange={date =>
                  setFormDeets({
                    ...formDeets,
                    closeDate: date,
                  })
                }
              />
            </FormControl> */}
          </AdminBlob>

          <AdminBlob title="Select Questions">
            <Box maxW="xl" mx="auto" width="full" px={{ base: '6', md: '8' }}>
              <Text fontSize="lg" mb="2" fontWeight="extrabold">
                Select up to 3 addition questions to ask applicants:
              </Text>
              <Text fontSize="sm" mb="8">
                At 2-3 Degrees we do not ask our young people to upload a CV.
                Along with the questions you select, you will also recieve the
                applicants Name, email, education and work experience.
              </Text>

              <StaticQuery
                query={META_QUERY}
                render={(data) => {
                  if (data.allWpJobApplicationQuestion) {
                    const questions = data.allWpJobApplicationQuestion.nodes;
                    console.log(selectedQuestions);
                    console.log(questions);
                    return (
                      <Stack spacing="5" justify="flex-start">
                        {questions &&
                          questions.map((question) => {
                            console.log(question.slug);
                            return (
                              <>
                                <HStack
                                  key={question.slug}
                                  spacing="4"
                                  border="2px solid"
                                  borderColor={
                                    selectedQuestions.includes(question.slug)
                                      ? 'blue.500'
                                      : 'gray.300'
                                  }
                                  rounded="md"
                                  p="4"
                                  cursor="pointer"
                                  onClick={() =>
                                    handleQuestionClick(question.slug)
                                  }
                                >
                                  <Box
                                    data-checked={
                                      selectedQuestions.includes(question.slug)
                                        ? ''
                                        : undefined
                                    }
                                    fontSize="2xl"
                                    color={
                                      selectedQuestions.includes(question.slug)
                                        ? 'blue.500'
                                        : 'gray.300'
                                    }
                                  >
                                    {selectedQuestions.includes(
                                      question.slug
                                    ) ? (
                                      <MdCheckBox />
                                    ) : (
                                      <MdCheckBoxOutlineBlank />
                                    )}
                                  </Box>
                                  <Box flex="1">
                                    <Text fontWeight="bold">
                                      {question.name}
                                    </Text>
                                  </Box>
                                </HStack>
                              </>
                            );
                          })}
                      </Stack>
                    );
                  }
                }}
              />
            </Box>
          </AdminBlob>

          {formType === 'update' && (
            <FieldGroup>
              <DangerZone id={id} />
            </FieldGroup>
          )}

          {formType === 'create' ? (
            <Button
              isLoading={submitLoading}
              loadingText="Submitting"
              alignSelf="flex-end"
              type="submit"
              color="gray.50"
              bg={'dBlue.300'}
              _hover={{ bg: 'dBlue.200' }}
              disabled={submitLoading || submitted}
            >
              Submit Opportunity
            </Button>
          ) : (
            <Button
              isLoading={submitLoading}
              loadingText="Updating"
              alignSelf="flex-end"
              type="submit"
              color="gray.50"
              bg="dBlue.300"
              _hover={{ bg: 'dBlue.200' }}
              disabled={submitLoading || submitted}
            >
              Update Opportunity
            </Button>
          )}
          {submitErrors && <MyError error={submitErrors} />}
          {submitted && (
            <Box w="100%" bg="dYellow.300" p="1">
              <Box p="4">
                <Text fontSize="lg" fontWeight="bold">
                  Yeaaahhh, you've done it!
                </Text>
                <Text>
                  Just need to wait for 2-3 Degrees to approve it, then then
                  your post will go live.
                </Text>
              </Box>
              <Box p="2" bg="gray.50" textAlign="end">
                <UnderlineLink link={`/maker/jobs`}>
                  Check out your opportunities
                </UnderlineLink>
              </Box>
            </Box>
          )}
        </Stack>
      </form>
    </Flex>
  );
};

const META_QUERY = graphql`
  query MetaQuery {
    allWpJobLocation {
      nodes {
        name
        id
      }
    }
    allWpSector {
      nodes {
        name
        id
      }
    }
    allWpJobType {
      nodes {
        name
        id
      }
    }
    allWpSkill {
      nodes {
        name
        id
      }
    }
    allWpSalaryStructure {
      nodes {
        name
        id
      }
    }
    allWpJobApplicationQuestion {
      nodes {
        name
        id
        slug
      }
    }
  }
`;
