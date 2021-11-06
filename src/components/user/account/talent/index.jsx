/**
 * External dependencies
 */
import { Alert, AlertIcon, Flex, HStack, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
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

  // const {
  //   data: talentData,
  //   loading: loadingTalent,
  //   refetch: refetchTalent,
  // } = useTalentViewerQuery();

  useEffect(() => {
    if (data) {
      // console.log(data.viewer.talentProfiles.nodes[0]?.id);
      setTalentProfileId(data.viewer.talentProfiles.nodes[0]?.id);
    }
  }, [data, loading]);

  // useEffect(() => {
  //   refetchTalent();
  //   console.log(talentData, 'refetchedddddddd');
  // }, []);

  const { viewer, loadingViewer } = useAuth();

  const [accountDeets, setAccountDeets] = useState({ roles: ['talent'] });

  return (
    <>
      <Header title="Your Account" pagetype={pagetype} />

      <Flex w="100%">
        <InnerSidebar
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

        <Content pagetype={pagetype} py="12">
          <VStack spacing="6">
            <AccountDeets
              setAccountCompleted={setAccountCompleted}
              accountDeets={accountDeets}
              setAccountDeets={setAccountDeets}
            />
            {viewer && !loadingViewer ? (
              <VStack spacing="4" mt="8">
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
              <>
                <TalentEducationDeets
                  setEducationCompleted={setEducationCompleted}
                  talentProfileId={talentProfileId}
                />
                <TalentWorkDeets
                  setWorkCompleted={setWorkCompleted}
                  talentProfileId={talentProfileId}
                />
              </>
            )}
          </VStack>
        </Content>
      </Flex>
    </>
  );
};
