import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

import { AdminBlob } from '../../../AdminBlob';
import { useAuth, useUpdateUser } from '../../../../hooks';

export const AccountDeets = ({
  setAccountCompleted,
  accountDeets,
  setAccountDeets,
}) => {
  const { viewer, loadingViewer, refetchViewer } = useAuth();
  const { updateUser, error, status } = useUpdateUser();

  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    if (viewer && !loadingViewer) {
      const accountInputs = [
        viewer.firstName,
        viewer.lastName,
        viewer.dob,
        viewer.postcode,
      ];
      const completed = accountInputs.every((input) => input);
      if (completed) setAccountCompleted(true);

      if (viewer.roles.nodes[0].name === 'talent') {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          dob: viewer.dob,
          postcode: viewer.postcode,
          email: viewer.email,
        });
      } else {
        setAccountDeets({
          ...accountDeets,
          id: viewer.id,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          email: viewer.email,
          roles: ['talent'],
        });
      }
    }
  }, [viewer, loadingViewer]);

  const handleSubmit = () => {
    updateUser(accountDeets).then(() => {
      refetchViewer();
      setProfileUpdated(true);
    });
  };

  return (
    <VStack spacing="4">
      <form
        id="updateAccountForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <AdminBlob title="Personal Info">
          <FormControl isRequired id="firstName">
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
          <FormControl isRequired id="lastName">
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
          <FormControl isRequired id="dob">
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="text"
              maxLength={100}
              placeholder="DD/MM/YYYY"
              value={accountDeets?.dob || ''}
              onChange={(e) =>
                setAccountDeets({
                  ...accountDeets,
                  dob: e.target.value,
                })
              }
            />
          </FormControl>
          {viewer?.roles?.nodes[0].name !== 'waiting' && (
            <FormControl isRequired id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={accountDeets?.email || ''}
                onChange={(e) =>
                  setAccountDeets({
                    ...accountDeets,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
          )}
          <FormControl isRequired id="postcode">
            <FormLabel>Postcode</FormLabel>
            <Input
              type="text"
              maxLength={100}
              placeholder="eg. E78FG"
              value={accountDeets?.postcode || ''}
              onChange={(e) =>
                setAccountDeets({
                  ...accountDeets,
                  postcode: e.target.value,
                })
              }
            />
          </FormControl>

          {status === 'resolved' && (
            <Alert status="success">
              <AlertIcon />
              Account updated
            </Alert>
          )}

          <Button
            bg="dYellow.300"
            _hover={{ bg: 'dYellow.200' }}
            isLoading={status === 'resolving'}
            loadingText="Updating"
            form="updateAccountForm"
            type="submit"
            disabled={status === 'resolving'}
            size="md"
            mt="6"
            w="100%"
          >
            {status === 'resolving'
              ? 'Updating Basic Info'
              : 'Update Basic Info'}
          </Button>

          {error && (
            <Alert status="success">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </AdminBlob>
      </form>
    </VStack>
  );
};
