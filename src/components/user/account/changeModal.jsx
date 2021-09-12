/**
 * External dependencies
 */
 import React, { useState } from 'react' 
 import {Button, FormLabel, Input, useDisclosure, Modal, ModalBody, ModalHeader, ModalFooter, ModalContent, ModalCloseButton, ModalOverlay, FormControl, Alert, AlertIcon} from '@chakra-ui/react'
 
/**
* Internal dependencies
// */
import { useUpdateUser } from '../../../hooks';
// import { navigate } from 'gatsby-link';
// import { useViewerQuery } from '../../../hooks/queries/use-viewer-query'
// import { useAuthContext } from '../../../context';
// import { useAuth } from '../../hooks';
// import UpdateProfileForm from './UpdateProfileForm';


export function ChangeModal({ title, type, curInput, accountDeets, setNewEmail, setPasswordChanged }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

	const [val, setVal] = useState('')

	// const { getViewer } = useViewerQuery()
	// const { setIsLoggedIn } = useAuthContext()
	// const emailRegex = /s+@s+.s+/
  // const emailMatchRegEx = email.match(emailRegex)

	const { updateUserLogin, error, status } = useUpdateUser()

	const typeSlug = type.toLowerCase()
	//console.log(typeSlug)

	const handleSubmit = (e) => {
		e.preventDefault()
		accountDeets[typeSlug] = val
		//console.log(accountDeets)
		updateUserLogin(accountDeets)
		.then(() => (typeSlug === 'email') ? setNewEmail(val) : setPasswordChanged(true))
		.then(onClose)
		.catch(err => console.log(err))
	}
  
	return (
    <>
      <Button fontWeight="medium" onClick={onOpen}>Change {type}</Button>

      <Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>

					{ 
						error &&
						<Alert status="warning">
							<AlertIcon />
							{error}
						</Alert>
					}

					{ 
						! error && status === 'resolved' && (
							<Alert status="success">
								<AlertIcon />
								Profile updated.
							</Alert>
						) 
					}

					<ModalCloseButton />
					<form onSubmit={handleSubmit}>
						<ModalBody>
							<FormControl id="changeEmailForm">
								<FormLabel>{`Current ${type}:`}</FormLabel>
								<Input 
									isReadOnly
									value={curInput}
								/>
							</FormControl>
							<FormControl>
							<FormLabel>{`New ${type}:`}</FormLabel>
								<Input 
									type={type.toLowerCase()} 
									value={val}
									onChange={e=> setVal(e.target.value)}
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button fontWeight="medium" colorScheme="blue" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button fontWeight="medium" type="submit" variant="ghost">Save</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
    </>
  )
}