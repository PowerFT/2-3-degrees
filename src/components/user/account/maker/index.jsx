/**
* External dependencies
*/
// import { ViewIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Stack, Textarea, VStack, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { HiCloudUpload } from 'react-icons/hi'
// import { FaGithub, FaGoogle } from 'react-icons/fa'

/**
* Internal dependencies
*/
import { ChangeModal } from '../changeModal'
// import { FieldGroup } from './FieldGroup'
import { useAuth } from '../../../../hooks'
import { DangerZone } from '../DangerZone'
import { MySpinner } from '../../../waiting/MySpinner'
// import { MyError } from '../../waiting/MyError'
import { useUpdateUser } from '../../../../hooks'
// import { useFileUpload } from '../../../hooks/use-file-upload'
// import { AdminContainer } from '../../AdminContainer'
import { AdminBlob } from '../../../AdminBlob'
import { MyError } from '../../../waiting/MyError'

export const AccountSettings = () => {

  // const { FileUploadInput } = useFileUpload()

  const { viewer, loadingViewer } = useAuth()
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    companyBio: '',
    companyWebsite: '',
    roles: ['maker']
  }
  const [accountDeets, setAccountDeets] = useState(initialState)
  // const [companyLogo, setCompanyLogo] = useState('')

  const { updateUser, error, status } = useUpdateUser()
  const handleSubmit = () => {
    console.log(accountDeets)
    updateUser(accountDeets)
  }

  useEffect(() => {
    console.log('use effect: ', viewer)
    if (viewer && !loadingViewer) {
      setAccountDeets({
        id: viewer.id,
        firstName: viewer.firstName,
        lastName: viewer.lastName,
        companyName: viewer.nickname,
        // roles: viewer.roles,
        companyBio: viewer.description,
        companyWebsite: viewer.url,
      })
    }
  }, [viewer, loadingViewer])

  if (loadingViewer || !viewer) {
    return (
      <MySpinner />
    )
  }

  if (error) return <MyError error={error} />

  return (
    <Flex
      className="account"
      bg="gray.200"
      maxW="5xl"
      w="100%"
      direction="column"
      align="center"
      h="fit-content"
      py="10"
    >

      {/* <FileUploadInput /> */}

      <Heading size="lg" as="h1" paddingBottom="4">
        Maker Account Settings
      </Heading>

      <Stack spacing="4" justify="center" align="center">

        <form
          id="accountForm"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >

          <Stack spacing="4" justify="center" align="center">

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

              <Button
                size="sm"
                w="100%"
                colorScheme="green"
                isLoading={status === 'resolving'}
                loadingText="Updating"
                type="submit"
                // colorScheme={ status === 'resolved' ? 'green' : "blue"}
                disabled={status === 'resolving'}
              >
                {status === 'resolving' ? "Updating" : "Update"}
              </Button >

            </AdminBlob>

          </Stack>

        </form>

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

            <HStack width="full" spacing="6">
              <ChangeModal setNewEmail={setNewEmail} title="Change Email" type="Email" accountDeets={accountDeets} curInput={viewer.email} />
              <ChangeModal setPasswordChanged={setPasswordChanged} title="Change Password" type="Password" accountDeets={accountDeets} curInput='*******' />
            </HStack>
          </VStack>
        </AdminBlob>

        <AdminBlob title="Delete Account">
          <DangerZone userId={viewer.id} />
        </AdminBlob>

      </Stack>

    </Flex>

  )
}
