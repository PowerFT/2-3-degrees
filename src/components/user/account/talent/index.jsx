/**
* External dependencies
*/
import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Input, InputGroup, InputLeftAddon, Stack, Textarea, VStack, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
/**
* Internal dependencies
*/
import { ChangeModal } from '../changeModal'
import { DangerZone } from '../DangerZone'
import { MySpinner } from '../../../waiting/MySpinner'
// import { MyError } from '../../waiting/MyError'
import { useUpdateUser, useAuth } from '../../../../hooks'
import { AdminBlob } from '../../../AdminBlob'
import { MyError } from '../../../waiting/MyError'
import { InnerSidebar } from '../../../layout/InnerSidebar'
import { Content } from '../../../layout/Content'
import { Header } from '../../../layout/Header'

export const TalentAccountSettings = () => {
  // const { FileUploadInput } = useFileUpload()

  const pagetype = "admin"
  const { viewer, loadingViewer, refetchViewer } = useAuth()
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [completed, setCompleted] = useState(false)

  const initialTalent = {
    id: '',
    firstName: '',
    lastName: '',
  }
  const [accountDeets, setAccountDeets] = useState(initialTalent)

  const { updateUser, error, status } = useUpdateUser()

  const handleSubmit = () => {
    updateUser(accountDeets)
    .then(() => {
      refetchViewer()
      setProfileUpdated(true)
    })
  }

  useEffect(() => {
    if (viewer && !loadingViewer) {
      const accountInputs = [viewer.firstName, viewer.lastName]
      const completed = accountInputs.every((input) => input)
      if(completed) setCompleted(true)
      if(viewer.roles.nodes[0].name === 'talent') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
        })
      } else {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          roles: ['talent'],
        })
      }
    }
  }, [viewer, loadingViewer])

  // useEffect(() => {
  //   let isCancelled = false;

  //   simulateSlowNetworkRequest().then(() => {
  //     if (!isCancelled) {
  //       setText("done!");
  //     }
  //   });

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  
  // if (error) return <MyError error={error} />

  //account data complete check
  // const accountInputs = [viewer.firstName, viewer.lastName, viewer.nickname, viewer.description, viewer.url]
  // const completed = accountInputs.every((input) => input)

  return (
    <>
      <Header
        title="Control your Account"
        subTitle="Test Sub"
        pagetype={pagetype}
      />
      
      <Flex w="100%">
        <InnerSidebar
          title="Test"
          primaryLinks={[["Connect Platform", "/connect/platform"], ["Latest Opportunites", "/connect/jobs"]]}
          secondaryLinks={[["Why we ask for account information", "#"], ["Terms and Conditions", "#"]]}
          pagetype={pagetype}
        />

      {loadingViewer || !viewer ? (
        <MySpinner />
      ) : (
        <Content
          pagetype={pagetype}
          py="12"
        >
          <form
            id="accountForm"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >

            <VStack spacing="4">

              {!completed && (
                  <Alert status="info" w={["xs", "sm"]}>
                    <AlertIcon />
                      Complete your account to use all of the Connect Platforms features.
                  </Alert>
                )}

              <AdminBlob title="Personal Info">

                <Stack w="100%">
                  <FormControl id="name">
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" maxLength={100} value={accountDeets.firstName} onChange={(e) => setAccountDeets({ ...accountDeets, firstName: e.target.value })} />
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" maxLength={100} value={accountDeets.lastName} onChange={(e) => setAccountDeets({ ...accountDeets, lastName: e.target.value })} />
                  </FormControl>
                </Stack>

              </AdminBlob>

              {profileUpdated && (
                <Alert status="success">
                  <AlertIcon />
                  Account updated
                </Alert>
              )}

              <Button
                size="md"
                w={["xs", "md"]}
                colorScheme="green"
                isLoading={status === 'resolving'}
                loadingText="Updating"
                type="submit"
                // colorScheme={ status === 'resolved' ? 'green' : "blue"}
                disabled={status === 'resolving'}
              >
                {status === 'resolving' ? "Updating" : "Update"}
              </Button >

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
                  <ChangeModal setNewEmail={setNewEmail} title="Change Email" type="Email" accountDeets={accountDeets} curInput={viewer.email} />
                  <ChangeModal setPasswordChanged={setPasswordChanged} title="Change Password" type="Password" accountDeets={accountDeets} curInput='*******' />
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

  )
}
