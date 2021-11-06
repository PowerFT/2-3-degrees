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

export const TalentEducationDeets = ({
  setEducationCompleted,
  talentProfileId,
}) => {
  console.log(talentProfileId);

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [talentDeets, setTalentDeets] = useState({});
  const [completed, setCompleted] = useState(false);

  //Select Educations buttons
  const eds = ['gcse', 'alevels', 'undergraduate', 'masters'];
  const [selectedEds, setSelectedEds] = useState([]);
  const [gcseSelected, setGcseSelected] = useState(false);
  const [alevelsSelected, setAlevelsSelected] = useState(false);
  const [undergraduateSelected, setUndergraduateSelected] = useState(false);
  const [mastersSelected, setMastersSelected] = useState(false);
  const [btecSelected, setBtecSelected] = useState(false);
  const [vocationalSelected, setVocationalSelected] = useState(false);
  const [tlevelSelected, setTlevelSelected] = useState(false);

  // const handleEdClick = (ed) => {
  //   if (!selectedEds.includes(ed)) {
  //     setSelectedEds([...selectedEds, ed]);
  //   } else {
  //     const newList = selectedEds.filter((edu) => edu !== ed);
  //     setSelectedEds(newList);
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
        console.log(talentData);
        const talent =
          talentData?.viewer?.talentProfiles?.nodes[0]?.talentProfile;

        console.log(talent);

        setTalentDeets({
          profileId: talentData?.viewer?.talentProfiles?.nodes[0]?.databaseId,
          firstName: viewer?.firstName,
          lastName: viewer?.lastName,
          dob: viewer?.dob,
          postcode: viewer?.postcode,
          email: viewer?.email,
          gcse: {
            gcseInstitution: talent?.gcse.gcseInstitution,
            gcseSubjects: talent?.gcse.gcseSubjects,
            gcseEndDate: talent?.gcse.gcseEndDate,
          },
          alevels: {
            alevelsInstitution: talent?.alevels.alevelsInstitution,
            alevelsSubjects: talent?.alevels.alevelsSubjects,
            alevelsEndDate: talent?.alevels.alevelsEndDate,
          },
          undergraduate: {
            undergraduateInstitution:
              talent?.undergraduate?.undergraduateInstitution,
            undergraduateSubjects: talent?.undergraduate?.undergraduateSubjects,
            undergraduateEndDate: talent?.undergraduate?.undergraduateEndDate,
          },
          masters: {
            mastersInstitution: talent?.masters?.mastersInstitution,
            mastersSubjects: talent?.masters?.mastersSubjects,
            mastersEndDate: talent?.masters?.mastersEndDate,
          },
          btec: {
            btecInstitution: talent?.btec?.btecInstitution,
            btecSubjects: talent?.btec?.btecSubjects,
            btecEndDate: talent?.btec?.btecEndDate,
          },
          vocational: {
            vocationalInstitution: talent?.vocational?.vocationalInstitution,
            vocationalSubjects: talent?.vocational?.vocationalSubjects,
            vocationalEndDate: talent?.vocational?.vocationalEndDate,
          },
          tlevel: {
            tlevelInstitution: talent?.tlevel?.tlevelInstitution,
            tlevelSubjects: talent?.tlevel?.tlevelSubjects,
            tlevelEndDate: talent?.tlevel?.tlevelEndDate,
          },
        });
      }

      // const accountInputs = [];
      // if (accountInputs.every((input) => input)) setCompleted(true);
    }
  }, [viewer, loadingViewer, talentData, !loadingTalentData]);

  useEffect(() => {
    console.log(talentDeets);
    if (talentDeets) {
      if (talentDeets.gcse) {
        if (Object.values(talentDeets?.gcse).some((element) => element)) {
          setGcseSelected(true);
        }
      }
      if (talentDeets.alevels) {
        if (Object.values(talentDeets?.alevels).some((element) => element)) {
          setAlevelsSelected(true);
        }
      }
      if (talentDeets.undergraduate) {
        if (
          Object.values(talentDeets?.undergraduate).some((element) => element)
        ) {
          setUndergraduateSelected(true);
        }
      }
      if (talentDeets.masters) {
        if (Object.values(talentDeets?.masters).some((element) => element)) {
          setMastersSelected(true);
        }
      }
      if (talentDeets.btec) {
        if (Object.values(talentDeets?.btec).some((element) => element)) {
          setBtecSelected(true);
        }
      }
      if (talentDeets.vocational) {
        if (Object.values(talentDeets?.vocational).some((element) => element)) {
          setVocationalSelected(true);
        }
      }
      if (talentDeets.tlevel) {
        if (Object.values(talentDeets?.tlevel).some((element) => element)) {
          setTlevelSelected(true);
        }
      }
    }
  }, [talentDeets]);

  //HANDLE SUBMITS

  const handleSubmit = (e) => {
    e.preventDefault();
    if (talentProfileId) {
      changeTalentProfile(talentDeets).then(() => {
        refetch();
        refetchViewer();
        setProfileUpdated(true);
        console.log('changedProfile', viewer);
      });
    } else {
      makeTalentProfile(talentDeets).then(() => {
        refetch();
        refetchViewer();
        setProfileUpdated(true);
        console.log('madeProfile', viewer);
      });
    }
  };

  useEffect(() => {
    console.log(changeStatus);
  }, [changeStatus]);

  if (!viewer || loadingViewer || loadingTalentData) return <MySpinner />;
  if (talentDataError) return <MyError error={talentDataError} />;

  return (
    <form id="updateTalentEducation" onSubmit={handleSubmit}>
      <AdminBlob title="Education">
        <Flex wrap="wrap" justify="center" w="100%">
          <Button
            // disabled={submitLoading || submitted}
            key="gcsebtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={gcseSelected ? 'dBlue.200' : 'gray.300'}
            _hover={gcseSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
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
            onClick={() => setGcseSelected(!gcseSelected)}
          >
            {gcseSelected ? `- GCSE` : `+ GCSE`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="alevelsbtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={alevelsSelected ? 'dBlue.200' : 'gray.300'}
            _hover={alevelsSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
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
            onClick={() => setAlevelsSelected(!alevelsSelected)}
          >
            {alevelsSelected ? `- A-levels` : `+ A-levels`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="undergraduatebtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={undergraduateSelected ? 'dBlue.200' : 'gray.300'}
            _hover={
              undergraduateSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }
            }
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
            onClick={() => setUndergraduateSelected(!undergraduateSelected)}
          >
            {undergraduateSelected ? `- Undergraduate` : `+ Undergraduate`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="mastersbtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={mastersSelected ? 'dBlue.200' : 'gray.300'}
            _hover={mastersSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
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
            onClick={() => setMastersSelected(!mastersSelected)}
          >
            {mastersSelected ? `- Masters` : `+ Masters`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="btecbtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={btecSelected ? 'dBlue.200' : 'gray.300'}
            _hover={btecSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
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
            onClick={() => setBtecSelected(!btecSelected)}
          >
            {btecSelected ? `- BTEC` : `+ BTEC`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="vocationalbtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={vocationalSelected ? 'dBlue.200' : 'gray.300'}
            _hover={
              vocationalSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }
            }
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
            onClick={() => setVocationalSelected(!vocationalSelected)}
          >
            {vocationalSelected ? `- Vocational` : `+ Vocational`}
          </Button>
          <Button
            // disabled={submitLoading || submitted}
            key="tlevelbtn"
            as="span"
            cursor="pointer"
            user-select="none"
            bg={tlevelSelected ? 'dBlue.200' : 'gray.300'}
            _hover={tlevelSelected ? { bg: 'dBlue.100' } : { bg: 'gray.200' }}
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
            onClick={() => setTlevelSelected(!tlevelSelected)}
          >
            {tlevelSelected ? `- T-level` : `+ T-level`}
          </Button>
        </Flex>

        {gcseSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">GSCE</Text>

            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.gcse?.gcseInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    gcse: {
                      ...talentDeets?.gcse,
                      gcseInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.gcse?.gcseSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    gcse: {
                      ...talentDeets?.gcse,
                      gcseSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.gcse?.gcseEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    gcse: {
                      ...talentDeets?.gcse,
                      gcseEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {alevelsSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">A-Levels</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.alevels?.alevelsInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    alevels: {
                      ...talentDeets?.alevels,
                      alevelsInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.alevels?.alevelsSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    alevels: {
                      ...talentDeets?.alevels,
                      alevelsSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.alevels?.alevelsEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    alevels: {
                      ...talentDeets?.alevels,
                      alevelsEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {undergraduateSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">Undergraduate</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.undergraduate?.undergraduateInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    undergraduate: {
                      ...talentDeets?.undergraduate,
                      undergraduateInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.undergraduate?.undergraduateSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    undergraduate: {
                      ...talentDeets?.undergraduate,
                      undergraduateSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.undergraduate?.undergraduateEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    undergraduate: {
                      ...talentDeets?.undergraduate,
                      undergraduateEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {mastersSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">Masters</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.masters?.mastersInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    masters: {
                      ...talentDeets?.masters,
                      mastersInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.masters?.mastersSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    masters: {
                      ...talentDeets?.masters,
                      mastersSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.masters?.mastersEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    masters: {
                      ...talentDeets?.masters,
                      mastersEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {btecSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">BTEC</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.btec?.btecInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    btec: {
                      ...talentDeets?.btec,
                      btecInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.btec?.btecSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    btec: {
                      ...talentDeets?.btec,
                      btecSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.btec?.btecEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    btec: {
                      ...talentDeets?.btec,
                      btecEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {vocationalSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">{'Vocational Course(s)'}</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.vocational?.vocationalInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    vocational: {
                      ...talentDeets?.vocational,
                      vocationalInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.vocational?.vocationalSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    vocational: {
                      ...talentDeets?.vocational,
                      vocationalSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.vocational?.vocationalEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    vocational: {
                      ...talentDeets?.vocational,
                      vocationalEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {tlevelSelected && (
          <Stack w="100%" bg="gray.50" rounded="lg" p="3" mb="4">
            <Text mb="2">T-level</Text>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.tlevel?.tlevelInstitution}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    tlevel: {
                      ...talentDeets?.tlevel,
                      tlevelInstitution: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{'Subjects (Grades)'}</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.tlevel?.tlevelSubjects}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    tlevel: {
                      ...talentDeets?.tlevel,
                      tlevelSubjects: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={talentDeets?.tlevel?.tlevelEndDate}
                onChange={(e) =>
                  setTalentDeets({
                    ...talentDeets,
                    tlevel: {
                      ...talentDeets?.tlevel,
                      tlevelEndDate: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        {profileUpdated && changeStatus === 'resolved' && (
          <Alert status="success">
            <AlertIcon />
            Account updated
          </Alert>
        )}

        <Button
          size="md"
          w="100%"
          colorScheme="green"
          isLoading={changeStatus === 'resolving' || makeStatus === 'resolving'}
          // loadingText="Updating"
          type="submit"
          form="updateTalentEducation"
          // colorScheme={ status === 'resolved' ? 'green' : "blue"}
          disabled={changeStatus === 'resolving' || makeStatus === 'resolving'}
        >
          {changeStatus === 'resolving' || makeStatus === 'resolving'
            ? 'Updating Education'
            : 'Update Education'}
        </Button>

        {changeError || makeError ? (
          <Alert status="info">
            <AlertIcon />
            {changeError || makeError}
          </Alert>
        ) : (
          <></>
        )}
      </AdminBlob>
    </form>
  );
};
