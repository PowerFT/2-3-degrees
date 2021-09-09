/**
* External dependencies
*/
import { Alert, AlertIcon, Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, LinkBox, LinkOverlay, Stack, Text, Textarea, VStack, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
/**
* Internal dependencies
*/
import { ChangeModal } from '../changeModal'
import { useAuth } from '../../../../hooks'
import { DangerZone } from '../DangerZone'
import { MySpinner } from '../../../waiting/MySpinner'
// import { MyError } from '../../waiting/MyError'
import { useUpdateUser } from '../../../../hooks'
import { AdminBlob } from '../../../AdminBlob'
import { MyError } from '../../../waiting/MyError'
import { Link } from 'gatsby'

export const AccountSettings = () => {

  // const { FileUploadInput } = useFileUpload()

  const { viewer, loadingViewer } = useAuth()
  const [newEmail, setNewEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    // roles: ['maker']
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

      if(viewer.roles.nodes[0].name === 'talent') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          companyName: viewer.nickname,
          companyBio: viewer.description,
          companyWebsite: viewer.url,
        })
      } else {
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
      }
      
    }
  }, [viewer, loadingViewer])

  console.log(accountDeets)

  if (loadingViewer || !viewer) {
    return (
      <MySpinner />
    )
  }

  if (error) return <MyError error={error} />

  const accountInputs = [viewer.firstName, viewer.lastName]
  const completed = accountInputs.every((input) => input)

  console.log(completed)

  return (
    <Flex
      className="account"
      w="100%"
      direction="column"
      align="center"
      h="fit-content"
    >

      {/* <FileUploadInput /> */}

      <Stack spacing={4} direction="row" spacing="24" position="relative" bg="gray.100" w="full">

        <Stack p="5" bg="dOrange.300" w={["xs", "sm"]} rounded="sm">
          <Heading size="xl" color={"gray.50"} as="h1" paddingBottom="4">
            Talent Account
          </Heading>
          <Stack spacing="3">
            <LinkBox _hover={{ bg: 'whiteAlpha.400' }} borderBottom="1px solid" borderColor="gray.50" w="100%" pt="1"><LinkOverlay as={Link} to="/connect-platform"><Heading size="lg" color="gray.50">Connect Platform</Heading></LinkOverlay></LinkBox>
            <LinkBox _hover={{ bg: 'whiteAlpha.400' }} borderBottom="1px solid" borderColor="gray.50" w="100%" pt="1"><LinkOverlay as={Link} to="/maker/jobs"><Heading size="lg" color="gray.50">See Latest Opportunities</Heading></LinkOverlay></LinkBox>
          </Stack>
          {/* <Button variant="outline" color="gray.50" w="full" disabled={!completed}> Post an Opportunity</Button> */}
        </Stack>

        <Stack spacing="4" justify="center" align="center" pb="10">

          <Heading alignSelf="flex-start" size="xl" as="h1" paddingBottom="4" mt="5" ml="5">
            Account Settings
          </Heading>
        
          <form
            id="accountForm"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >

            <Stack spacing="4" justify="center" align="center">

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
        
      </Stack>
      
      

    </Flex>

  )
}
