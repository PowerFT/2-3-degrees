/**
 * External dependencies
 */
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
/**
 * Internal dependencies
 */
import { useAuth } from '../../../../hooks';
import { AdminBlob } from '../../../AdminBlob';
import { useTalentViewerQuery } from '../../../../hooks/queries/use-viewer-talent-query';
import { useMakeTalentProfile } from '../../../../hooks/use-make-talent-profile';
import { useChangeTalentProfile } from '../../../../hooks/use-change-talent-profile';

import { MySpinner } from '../../../waiting/MySpinner';
import { MyError } from '../../../waiting/MyError';

export const TalentWorkDeets = ({
  talentProfileId,
  setTalentProfileUpdateLoading,
  talentProfileUpdateLoading,
  setExperienceUpdated,
}) => {
  // console.log(talentProfileId);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [talentDeets, setTalentDeets] = useState({});
  // const [completed, setCompleted] = useState(false);
  const [we1Selected, setWe1Selected] = useState(false);
  const [we2Selected, setWe2Selected] = useState(false);
  const [we3Selected, setWe3Selected] = useState(false);
  const [we4Selected, setWe4Selected] = useState(false);
  const [we5Selected, setWe5Selected] = useState(false);

  //Select Educations buttons
  // const works = ['we1', 'we2', 'we3'];
  const [selectedWorks, setSelectedWorks] = useState([]);
  // const handleEdClick = (works) => {
  //   if (!selectedWorks.includes(works)) {
  //     setSelectedWorks([...selectedWorks, works]);
  //   } else {
  //     const newList = selectedWorks.filter((work) => work !== work);
  //     setSelectedWorks(newList);
  //   }
  // };

  //QUERIES
  const { viewer, loadingViewer, refetchViewer } = useAuth();
  const {
    data: talentData,
    loading: loadingTalentData,
    error: talentDataError,
    refetch,
  } = useTalentViewerQuery();

  //MUTATIONS
  const {
    changeTalentProfile,
    error: changeError,
    status: changeStatus,
  } = useChangeTalentProfile();
  const {
    makeTalentProfile,
    error: makeError,
    status: makeStatus,
  } = useMakeTalentProfile();

  useEffect(() => {
    if (viewer && !loadingViewer) {
      if (talentData && !loadingTalentData) {
        const talent =
          talentData?.viewer.talentProfiles?.nodes[0]?.talentProfile;
        setTalentDeets({
          profileId: talentData?.viewer?.talentProfiles?.nodes[0]?.databaseId,
          firstName: viewer?.firstName,
          lastName: viewer?.lastName,
          dob: viewer?.dob,
          postcode: viewer?.postcode,
          email: viewer?.email,
          workExperienceOne: {
            we1Company: talent?.workExperienceOne.we1Company,
            we1Role: talent?.workExperienceOne.we1Role,
            we1Start: talent?.workExperienceOne.we1Start,
            we1End: talent?.workExperienceOne.we1End,
          },
          workExperienceTwo: {
            we2Company: talent?.workExperienceTwo.we2Company,
            we2Role: talent?.workExperienceTwo.we2Role,
            we2Start: talent?.workExperienceTwo.we2Start,
            we2End: talent?.workExperienceTwo.we2End,
          },
          workExperienceThree: {
            we3Company: talent?.workExperienceThree.we3Company,
            we3Role: talent?.workExperienceThree.we3Role,
            we3Start: talent?.workExperienceThree.we3Start,
            we3End: talent?.workExperienceThree.we3End,
          },
          workExperienceFour: {
            we4Company: talent?.workExperienceFour?.we4Company,
            we4Role: talent?.workExperienceFour?.we4Role,
            we4Start: talent?.workExperienceFour?.we4Start,
            we4End: talent?.workExperienceFour?.we4End,
          },
          workExperienceFive: {
            we5Company: talent?.workExperienceFive?.we5Company,
            we5Role: talent?.workExperienceFive?.we5Role,
            we5Start: talent?.workExperienceFive?.we5Start,
            we5End: talent?.workExperienceFive?.we5End,
          },
        });
      }

      // const accountInputs = [
      // ];
      // if (accountInputs.every((input) => input)) setCompleted(true);
    }
  }, [viewer, loadingViewer, talentData, !loadingTalentData]);

  useEffect(() => {
    // console.log(talentDeets);
    if (talentDeets) {
      if (talentDeets?.workExperienceOne) {
        if (
          Object.values(talentDeets?.workExperienceOne).some(
            (element) => element
          )
        ) {
          setWe1Selected(true);
        }
      }

      if (talentDeets?.workExperienceTwo) {
        if (
          Object.values(talentDeets?.workExperienceTwo).some(
            (element) => element
          )
        ) {
          setWe2Selected(true);
        }
      }

      if (talentDeets?.workExperienceThree) {
        if (
          Object.values(talentDeets?.workExperienceThree).some(
            (element) => element
          )
        ) {
          setWe3Selected(true);
        }
      }

      if (talentDeets?.workExperienceFour) {
        if (
          Object.values(talentDeets?.workExperienceFour).some(
            (element) => element
          )
        ) {
          setWe4Selected(true);
        }
      }

      if (talentDeets?.workExperienceFive) {
        if (
          Object.values(talentDeets?.workExperienceFive).some(
            (element) => element
          )
        ) {
          setWe5Selected(true);
        }
      }
    }
  }, [talentDeets]);

  useEffect(() => {
    setTalentProfileUpdateLoading(changeStatus || makeStatus);
  }, [changeStatus, makeStatus]);

  //HANDLE SUBMITS

  const handleSubmit = () => {
    if (talentProfileId) {
      changeTalentProfile(talentDeets)
        .then(() => {
          refetch();
          refetchViewer();
          setProfileUpdated(true);
        })
        .then(() => setExperienceUpdated(true));
    } else {
      makeTalentProfile(talentDeets)
        .then(() => {
          refetch();
          refetchViewer();
          setProfileUpdated(true);
        })
        .then(() => setExperienceUpdated(true));
    }
  };

  if (!viewer || loadingViewer || loadingTalentData) return <MySpinner />;
  if (talentDataError) return <MyError error={talentDataError} />;

  return (
    <form
      id="updateTalentExperience"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <VStack mt="6">
        <AdminBlob title="Experience">
          <Flex wrap="wrap" justify="center" w="100%">
            <Button
              // disabled={submitLoading || submitted}
              key="workexp1"
              as="span"
              cursor="pointer"
              user-select="none"
              bg={we1Selected ? 'dBlue.200' : 'gray.300'}
              _hover={we1Selected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              // fontWeight=""
              // bg={active ? "red.700" : "gray.50"}
              // _active={active === skill}
              onClick={() => setWe1Selected(!we1Selected)}
            >
              {we1Selected ? `- Latest Experience` : `+ Latest Experience`}
            </Button>
            <Button
              // disabled={submitLoading || submitted}
              key="workexp2"
              as="span"
              cursor="pointer"
              user-select="none"
              bg={we2Selected ? 'dBlue.200' : 'gray.300'}
              _hover={we2Selected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              // fontWeight=""
              // bg={active ? "red.700" : "gray.50"}
              // _active={active === skill}
              onClick={() => setWe2Selected(!we2Selected)}
            >
              {we2Selected ? `- Experience 2` : `+ Experience 2`}
            </Button>
            <Button
              // disabled={submitLoading || submitted}
              key="workexp3"
              as="span"
              cursor="pointer"
              user-select="none"
              bg={we3Selected ? 'dBlue.200' : 'gray.300'}
              _hover={we3Selected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              // fontWeight=""
              // bg={active ? "red.700" : "gray.50"}
              // _active={active === skill}
              onClick={() => setWe3Selected(!we3Selected)}
            >
              {we3Selected ? `- Experience 3` : `+ Experience 3`}
            </Button>
            <Button
              // disabled={submitLoading || submitted}
              key="workexp4"
              as="span"
              cursor="pointer"
              user-select="none"
              bg={we4Selected ? 'dBlue.200' : 'gray.300'}
              _hover={we4Selected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              // fontWeight=""
              // bg={active ? "red.700" : "gray.50"}
              // _active={active === skill}
              onClick={() => setWe4Selected(!we4Selected)}
            >
              {we4Selected ? `- Experience 4` : `+ Experience 4`}
            </Button>
            <Button
              // disabled={submitLoading || submitted}
              key="workexp5"
              as="span"
              cursor="pointer"
              user-select="none"
              bg={we5Selected ? 'dBlue.200' : 'gray.300'}
              _hover={we5Selected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
              color="gray.700"
              textAlign="center"
              mr="1"
              mb="2"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              // fontWeight=""
              // bg={active ? "red.700" : "gray.50"}
              // _active={active === skill}
              onClick={() => setWe5Selected(!we5Selected)}
            >
              {we5Selected ? `- Experience 5` : `+ Experience 5`}
            </Button>
          </Flex>

          {we1Selected && (
            <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
              <Text mb="2">{'Experience (latest)'}</Text>

              <FormControl isRequired>
                <FormLabel>Organisation</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  _focus={{ bg: 'white' }}
                  maxLength={100}
                  value={talentDeets?.workExperienceOne?.we1Company}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceOne: {
                        ...talentDeets?.workExperienceOne,
                        we1Company: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role / Title</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceOne?.we1Role}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceOne: {
                        ...talentDeets?.workExperienceOne,
                        we1Role: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceOne?.we1Start}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceOne: {
                        ...talentDeets?.workExperienceOne,
                        we1Start: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceOne?.we1End}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceOne: {
                        ...talentDeets?.workExperienceOne,
                        we1End: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
          )}

          {we2Selected && (
            <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
              <Text mb="2">{'Experience 2'}</Text>
              <FormControl isRequired>
                <FormLabel>Organisation</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceTwo?.we2Company}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceTwo: {
                        ...talentDeets?.workExperienceTwo,
                        we2Company: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role / Title</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceTwo?.we2Role}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceTwo: {
                        ...talentDeets?.workExperienceTwo,
                        we2Role: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceTwo?.we2Start}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceTwo: {
                        ...talentDeets?.workExperienceTwo,
                        we2Start: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceTwo?.we2End}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceTwo: {
                        ...talentDeets?.workExperienceTwo,
                        we2End: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
          )}

          {we3Selected && (
            <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
              <Text mb="2">{'Experience 3'}</Text>
              <FormControl isRequired>
                <FormLabel>Organisation</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceThree.we3Company}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceThree: {
                        ...talentDeets?.workExperienceThree,
                        we3Company: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role / Title</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceThree.we3Role}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceThree: {
                        ...talentDeets?.workExperienceThree,
                        we3Role: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceThree.we3Start}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceThree: {
                        ...talentDeets?.workExperienceThree,
                        we3Start: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceThree.we3End}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceThree: {
                        ...talentDeets?.workExperienceThree,
                        we3End: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
          )}

          {we4Selected && (
            <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
              <Text mb="2">{'Experience 4'}</Text>
              <FormControl isRequired>
                <FormLabel>Organisation</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFour?.we4Company}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFour: {
                        ...talentDeets?.workExperienceFour,
                        we4Company: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role / Title</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFour?.we4Role}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFour: {
                        ...talentDeets?.workExperienceFour,
                        we4Role: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFour?.we4Start}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFour: {
                        ...talentDeets?.workExperienceFour,
                        we4Start: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFour?.we4End}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFour: {
                        ...talentDeets?.workExperienceFour,
                        we4End: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
          )}

          {we5Selected && (
            <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
              <Text mb="2">{'Experience 5'}</Text>
              <FormControl isRequired>
                <FormLabel>Organisation</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFive?.we5Company}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFive: {
                        ...talentDeets?.workExperienceFive,
                        we5Company: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role / Title</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFive?.we5Role}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFive: {
                        ...talentDeets?.workExperienceFive,
                        we5Role: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFive?.we5Start}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFive: {
                        ...talentDeets?.workExperienceFive,
                        we5Start: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  _focus={{ bg: 'white' }}
                  type="text"
                  maxLength={100}
                  value={talentDeets?.workExperienceFive?.we5End}
                  onChange={(e) =>
                    setTalentDeets({
                      ...talentDeets,
                      workExperienceFive: {
                        ...talentDeets?.workExperienceFive,
                        we5End: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
          )}

          <Box>
            {profileUpdated && changeStatus === 'resolved' && (
              <Alert status="success" mb="2">
                <AlertIcon />
                Account updated
              </Alert>
            )}

            <Button
              size="md"
              w="100%"
              bg="dYellow.300"
              _hover={{ bg: 'dYellow.200' }}
              isLoading={
                changeStatus === 'resolving' || makeStatus === 'resolving'
              }
              // loadingText="Updating"
              type="submit"
              form="updateTalentExperience"
              // colorScheme={ status === 'resolved' ? 'green' : "blue"}
              disabled={talentProfileUpdateLoading === 'resolving'}
            >
              {changeStatus === 'resolving' || makeStatus === 'resolving'
                ? 'Updating Experience'
                : 'Update Experience'}
            </Button>

            {changeError || makeError ? (
              <Alert status="info">
                <AlertIcon />
                {changeError || makeError}
              </Alert>
            ) : (
              <></>
            )}
          </Box>
        </AdminBlob>
      </VStack>
    </form>
  );
};
