/**
 * External dependencies
 */
import React, { useState } from 'react';
import {
  Button,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  FormControl,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

/**
* Internal dependencies
// */
import { useAuth, useUpdateUser } from '../../../hooks';
import { HiLogout } from 'react-icons/hi';
// import { navigate } from 'gatsby-link';
// import { useViewerQuery } from '../../../hooks/queries/use-viewer-query'
// import { useAuthContext } from '../../../context';
// import { useAuth } from '../../hooks';
// import UpdateProfileForm from './UpdateProfileForm';

export function ChangeModal({
  title,
  type,
  curInput,
  accountDeets,
  setNewEmail,
  setPasswordChanged,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [val, setVal] = useState('');

  const { logout } = useAuth();
  // const emailRegex = /s+@s+.s+/
  // const emailMatchRegEx = email.match(emailRegex)

  const { updateUserLogin, error, status } = useUpdateUser();

  const typeSlug = type.toLowerCase();
  //console.log(typeSlug)

  const handleSubmit = (e) => {
    e.preventDefault();
    accountDeets[typeSlug] = val;
    //console.log(accountDeets)
    updateUserLogin(accountDeets)
      .then(() =>
        typeSlug === 'email' ? setNewEmail(val) : setPasswordChanged(true)
      )
      .then(() => {
        console.log('close');
        onClose();
      })
      .then(() => {
        logout();
        console.log('logginout');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button fontWeight="medium" onClick={onOpen}>
        Change {type}
      </Button>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          {error && (
            <Alert status="warning">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {!error && status === 'resolved' && (
            <Alert status="success">
              <AlertIcon />
              Profile updated.
            </Alert>
          )}

          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>{`New ${type}:`}</FormLabel>
                <Input
                  type={type.toLowerCase()}
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                fontWeight="medium"
                colorScheme="gray"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                fontWeight="medium"
                type="submit"
                isLoading={status === 'resolving'}
                loadingText="Updating"
                disabled={status === 'resolving'}
              >
                {`Update ${type}`}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
