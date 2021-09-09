/**
* External dependencies
*/
import { Alert, AlertIcon, Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, LinkBox, LinkOverlay, Stack, Text, Textarea, VStack, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
/**
* Internal dependencies
*/
import { ChangeModal } from './changeModal'
import { useAuth } from '../../../hooks'
import { DangerZone } from './DangerZone'
import { MySpinner } from '../../waiting/MySpinner'
// import { MyError } from '../../waiting/MyError'
import { useUpdateUser } from '../../../hooks'
import { AdminBlob } from '../../AdminBlob'
import { MyError } from '../../waiting/MyError'
import { Link } from 'gatsby'
import { InnerSidebar } from '../../layout/InnerSidebar'
import { Content } from '../../layout/Content'
import { Header } from '../../layout/Header'

export const AccountSettings = ({user}) => {
console.log("user", user)
  // const { FileUploadInput } = useFileUpload()

  const { viewer, loadingViewer } = useAuth()
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const initialMaker = {
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    companyBio: '',
    companyWebsite: '',
  }
  const initialTalent = {
    id: '',
    firstName: '',
    lastName: '',
  }
  const [accountDeets, setAccountDeets] = useState(user === "maker" ? initialMaker : initialTalent)
  // const [companyLogo, setCompanyLogo] = useState('')

  const { updateUser, error, status } = useUpdateUser()
  const handleSubmit = () => {
    console.log("account detts",accountDeets)
    updateUser(accountDeets)
  }

  useEffect(() => {
    console.log('use effect: ', viewer)
    if (viewer && !loadingViewer) {

      if(user === "maker" & viewer.roles.nodes[0].name === 'maker') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        })
      } else if(user === "talent" & viewer.roles.nodes[0].name === 'talent') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
        })
      } else if(user === "maker") {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          roles: ['maker'],
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        })
      } else if(user === "talent") {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          roles: ['talent'],
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        })
      } else {
        setAccountDeets({
          ...accountDeets,
        })
      }
      
    }
  }, [viewer, loadingViewer])

  if (loadingViewer || !viewer) {
    return (
      <MySpinner />
    )
  }
  if (error) return <MyError error={error} />

  //account data complete check
  const accountInputs = [viewer.firstName, viewer.lastName, viewer.nickname, viewer.description, viewer.url]
  const completed = accountInputs.every((input) => input)

  const pageType = "admin"

  return (
    <>

      <Header
        title="Control your Account"
        subTitle="Test Sub"
        pageType={pageType}
      />
      
      <Flex w="100%">
        <InnerSidebar
          title="Test"
          primaryLinks={[["Connect Platform", "/connect-platform"], ["Latest Opportunites", "/connect-platform/jobs"]]}
          secondaryLinks={[["Why we ask for account information", "#"], ["Terms and Conditions", "#"]]}
          pageType={pageType}
        />
        <Content
          pageType={pageType}
        >
          <form
            id="accountForm"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >

            <VStack spacing="4" mt="6">

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

              {
                user === "maker" && (
                  <AdminBlob title="Organisation Info" spacing="6">

                  <VStack width="full" spacing="6">

                    <FormControl id="cNameEdit">
                      <FormLabel>Organisation Name</FormLabel>
                      <Input type="text" value={accountDeets.companyName} onChange={(e) => setAccountDeets({ ...accountDeets, companyName: e.target.value })} />
                    </FormControl>

                    <FormControl id="cNameEdit">
                      <FormLabel>Organisation Website</FormLabel>
                      <InputGroup>
                        <InputLeftAddon children="https://" />
                        <Input placeholder="mysite" type="text" value={accountDeets.companyWebsite} onChange={(e) => setAccountDeets({ ...accountDeets, companyWebsite: e.target.value })} />
                      </InputGroup>
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

                    <FormControl id="bio">
                      <FormLabel>Organisation Bio</FormLabel>
                      <Textarea rows={5} value={accountDeets.companyBio} onChange={(e) => setAccountDeets({ ...accountDeets, companyBio: e.target.value })} />
                      <FormHelperText>
                        Brief description for your organisation's account.
                      </FormHelperText>
                    </FormControl>
                  </VStack>

                  </AdminBlob>
                )
              }

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
      </Flex>

</>

  )
}
