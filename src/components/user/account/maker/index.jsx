/**
 * External dependencies
 */
import {
  Icon,
  LinkBox,
  LinkOverlay,
  Heading,
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
/**
 * Internal dependencies
 */
import { ChangeModal } from '../changeModal';
import { useAuth } from '../../../../hooks';
import { DangerZone } from '../DangerZone';
import { MySpinner } from '../../../waiting/MySpinner';
import { useUpdateUser } from '../../../../hooks';
import { AdminBlob } from '../../../AdminBlob';
import { InnerSidebar } from '../../../layout/InnerSidebar';
import { Content } from '../../../layout/Content';
import { Header } from '../../../layout/Header';
import { BsFillLightningFill } from 'react-icons/bs';
import { Link } from 'gatsby';

export const MakerAccountSettings = () => {
  // const { FileUploadInput } = useFileUpload()
  const pagetype = 'admin';
  const { viewer, loadingViewer, refetchViewer } = useAuth();
  const { updateUser, error, status } = useUpdateUser();
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [accountDeets, setAccountDeets] = useState(initialMaker);

  const initialMaker = {
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    companyBio: '',
    companyWebsite: '',
  };

  const handleSubmit = () => {
    updateUser(accountDeets).then(() => {
      refetchViewer();
      setProfileUpdated(true);
      console.log('refetch', viewer);
    });
  };

  useEffect(() => {
    if (viewer && !loadingViewer) {
      const accountInputs = [
        viewer.firstName,
        viewer.lastName,
        viewer.nickname,
        viewer.description,
        viewer.url,
      ];
      const completed = accountInputs.every((input) => input);
      if (completed) setCompleted(true);
      if (viewer.roles.nodes[0].name === 'maker') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        });
      } else {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          roles: ['maker'],
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        });
      }
    }
  }, [viewer, loadingViewer]);

  const primaryLinks = [
    ['Connect Platform', '/connect/platform'],
    ['Latest Opportunites', '/connect/jobs'],
  ];

  return (
    <>
      <Header title="Your Account" pagetype={pagetype} />

      <Flex w="100%">
        <InnerSidebar
          title="Test"
          primaryLinks={primaryLinks}
          secondaryLinks={[
            ['Why we ask for account information', '#'],
            ['Terms and Conditions', '#'],
          ]}
          pagetype={pagetype}
        />

        {loadingViewer || !viewer ? (
          <MySpinner />
        ) : (
          <Content pagetype={pagetype} py="12">
            <form
              id="accountForm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <VStack spacing="4">
                {!completed && (
                  <Alert status="info" w={['xs', 'sm']}>
                    <AlertIcon />
                    Complete your account to use all of the Connect Platforms
                    features.
                  </Alert>
                )}

                <AdminBlob title="Personal Info">
                  <Stack w="100%">
                    <FormControl id="name">
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        maxLength={100}
                        value={accountDeets?.firstName}
                        onChange={(e) =>
                          setAccountDeets({
                            ...accountDeets,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        maxLength={100}
                        value={accountDeets?.lastName}
                        onChange={(e) =>
                          setAccountDeets({
                            ...accountDeets,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Stack>
                </AdminBlob>

                <AdminBlob title="Organisation Info" spacing="6">
                  <VStack width="full" spacing="6">
                    <FormControl id="cNameEdit">
                      <FormLabel>Organisation Name</FormLabel>
                      <Input
                        type="text"
                        value={
                          accountDeets?.companyName === viewer.username
                            ? ''
                            : accountDeets?.companyName
                        }
                        onChange={(e) =>
                          setAccountDeets({
                            ...accountDeets,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl id="cNameEdit">
                      <FormLabel>Organisation Website</FormLabel>
                      <InputGroup>
                        <InputLeftAddon children="https://" />
                        <Input
                          placeholder="mysite"
                          type="text"
                          value={accountDeets?.companyWebsite}
                          onChange={(e) =>
                            setAccountDeets({
                              ...accountDeets,
                              companyWebsite: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl id="bio">
                      <FormLabel>Organisation Bio</FormLabel>
                      <Textarea
                        rows={5}
                        value={accountDeets?.companyBio}
                        onChange={(e) =>
                          setAccountDeets({
                            ...accountDeets,
                            companyBio: e.target.value,
                          })
                        }
                      />
                      <FormHelperText>
                        Brief description for your organisation's account.
                      </FormHelperText>
                    </FormControl>
                  </VStack>
                </AdminBlob>

                {profileUpdated && (
                  <Alert status="success">
                    <AlertIcon />
                    Account updated
                  </Alert>
                )}

                <Button
                  size="md"
                  w={['xs', 'md']}
                  colorScheme="green"
                  isLoading={status === 'resolving'}
                  loadingText="Updating"
                  type="submit"
                  // colorScheme={ status === 'resolved' ? 'green' : "blue"}
                  disabled={status === 'resolving'}
                >
                  {status === 'resolving' ? 'Updating' : 'Update'}
                </Button>

                <VStack
                  spacing="0"
                  border="1px solid"
                  color="gray.900"
                  w="100%"
                  rounded="sm"
                  display={{ base: 'flex', lg: 'none' }}
                >
                  <Flex
                    align="center"
                    bg="gray.900"
                    fontSize="xs"
                    textAlign="start"
                    rounded="sm"
                    color="gray.300"
                    w="100%"
                    py="1"
                    pl="2"
                  >
                    <Icon as={BsFillLightningFill} mr="1" />
                    Quick Links
                  </Flex>
                  {primaryLinks.map((link, i) => (
                    <LinkBox
                      key={i}
                      _hover={{ bg: 'whiteAlpha.900' }}
                      borderBottom={
                        i !== primaryLinks.length - 1 ? '1px solid' : null
                      }
                      // borderColor="gray.50"
                      w="100%"
                      pt="1"
                    >
                      <LinkOverlay as={Link} to={link[1]}>
                        <Heading size="md" color="inherit" px="2" py="1">
                          {link[0]}
                        </Heading>
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </VStack>
              </VStack>
            </form>
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
          </Content>
        )}
      </Flex>
    </>
  );
};
