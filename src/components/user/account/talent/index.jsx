/**
 * External dependencies
 */
import {
  Alert,
  AlertIcon,
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { navigate } from 'gatsby';
/**
 * Internal dependencies
 */
import { ChangeModal } from '../changeModal';
import { DangerZone } from '../DangerZone';
import { MySpinner } from '../../../waiting/MySpinner';
import { AdminBlob } from '../../../AdminBlob';
import { InnerSidebar } from '../../../layout/InnerSidebar';
import { Content } from '../../../layout/Content';
import { Header } from '../../../layout/Header';
import { AccountDeets } from './AccountDeets';
import { TalentEducationDeets } from './TalentEducationDeets';
import { TalentWorkDeets } from './TalentWorkDeets';
import { useAuth } from '../../../../hooks';

// import { useTalentViewerQuery } from '../../../../hooks/queries/use-viewer-talent-query';

const CHECK_PROFILE_EXISTS = gql`
  query CheckProfileId {
    viewer {
      talentProfiles {
        nodes {
          id
        }
      }
    }
  }
`;

export const TalentAccountSettings = () => {
  // const { FileUploadInput } = useFileUpload()

  const pagetype = 'admin';

  const [accountCompleted, setAccountCompleted] = useState(false);
  const [educationCompleted, setEducationCompleted] = useState(false);
  const [workCompleted, setWorkCompleted] = useState(false);

  //Change Email or Password
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  //check talent profile exists
  const [talentProfileId, setTalentProfileId] = useState(false);
  const { data, loading, error } = useQuery(CHECK_PROFILE_EXISTS);

  useEffect(() => {
    if (data) {
      // console.log(data.viewer.talentProfiles.nodes[0]?.id);
      setTalentProfileId(data.viewer.talentProfiles.nodes[0]?.id);
    }
  }, [data, loading]);

  const { viewer, loadingViewer, logout } = useAuth();

  const [accountDeets, setAccountDeets] = useState({ roles: ['talent'] });

  useEffect(() => {
    if (viewer && !loadingViewer) {
      if (viewer?.roles?.nodes[0].name === 'maker') navigate('/maker/account');
      const accountInputs = [
        viewer.firstName,
        viewer.lastName,
        viewer.dob,
        viewer.postcode,
      ];
      const completed = accountInputs.every((input) => input);
      if (completed) setAccountCompleted(true);
      // console.log(viewer.roles);
    }
  }, [viewer, loadingViewer]);

  return (
    <>
      <Header title="Your Account" pagetype={pagetype} />

      <Flex w="100%">
        {viewer && loadingViewer && (
          <InnerSidebar
            display={
              viewer?.roles?.nodes[0].name === 'waiting' ? 'none' : 'block'
            }
            title="Test"
            primaryLinks={[
              ['Connect Platform', '/connect/platform'],
              ['Latest Opportunites', '/connect/jobs'],
            ]}
            secondaryLinks={[
              ['Why we ask for account information', '#'],
              ['Terms and Conditions', '#'],
            ]}
            pagetype={pagetype}
          />
        )}

        <Content pagetype={pagetype} py="12">
          <VStack spacing="6">
            <VStack
              p="3"
              bg={!accountCompleted && 'dOrange.300'}
              align="center"
              direction="column"
              spacing="6"
            >
              {!accountCompleted && (
                <Box
                  color="gray.900"
                  border="3px solid"
                  rounded="lg"
                  w={['xs', 'sm']}
                  m="2"
                  p="2"
                  textAlign="center"
                  bg="dYellow.300"
                >
                  <Text fontWeight="500" fontSize="md" color="gray.900">
                    Complete your account to use the Connect Platform.
                  </Text>
                </Box>
              )}
              <AccountDeets
                setAccountCompleted={setAccountCompleted}
                accountDeets={accountDeets}
                setAccountDeets={setAccountDeets}
              />

              <Button
                display={
                  viewer?.roles?.nodes[0].name === 'talent' ? 'none' : 'block'
                }
                variant="outline"
                w={['xs', 'md']}
                mt="6"
                colorScheme="gray"
                onClick={() => logout()}
              >
                Logout and finish later
              </Button>
            </VStack>

            {viewer && !loadingViewer ? (
              <VStack
                spacing="4"
                mt="8"
                display={
                  viewer?.roles?.nodes[0].name === 'waiting' ? 'none' : 'flex'
                }
              >
                <AdminBlob title="Change Login">
                  <VStack width="full" spacing="6">
                    {newEmail && (
                      <Alert status="success">
                        <AlertIcon />
                        {`New email set: ${newEmail}`}
                      </Alert>
                    )}
                    {passwordChanged && (
                      <Alert status="success">
                        <AlertIcon />
                        Password successfully changed.
                      </Alert>
                    )}

                    <HStack width="full" spacing="6" justify="center">
                      <ChangeModal
                        setNewEmail={setNewEmail}
                        title="Change Email"
                        type="Email"
                        accountDeets={accountDeets}
                        curInput={viewer.email}
                      />
                      <ChangeModal
                        setPasswordChanged={setPasswordChanged}
                        title="Change Password"
                        type="Password"
                        accountDeets={accountDeets}
                        curInput="*******"
                      />
                    </HStack>
                  </VStack>
                </AdminBlob>

                <AdminBlob title="Delete Account">
                  <DangerZone userId={viewer.id} />
                </AdminBlob>
              </VStack>
            ) : (
              <MySpinner />
            )}

            {data && !loading && (
              <Box
                display={
                  viewer?.roles?.nodes[0].name === 'waiting' ? 'none' : 'block'
                }
              >
                <TalentEducationDeets
                  setEducationCompleted={setEducationCompleted}
                  talentProfileId={talentProfileId}
                />
                <TalentWorkDeets
                  setWorkCompleted={setWorkCompleted}
                  talentProfileId={talentProfileId}
                />
              </Box>
            )}
          </VStack>
        </Content>
      </Flex>
    </>
  );
};
