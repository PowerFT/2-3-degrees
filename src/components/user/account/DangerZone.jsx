import { Button, Stack, Text, Alert, AlertIcon } from '@chakra-ui/react'
import * as React from 'react'
import { useDeleteUser } from '../../../hooks'
import { useAuth } from '../../../hooks'
// import { navigate } from 'gatsby-link'

export const DangerZone = (props) => {

	const userId = props.userId
	const { deleteUser, error } = useDeleteUser(userId)

	const { logout } = useAuth()

	const handleDelete = () => {
		deleteUser()
			.then(logout())
		// .then(navigate('/'))
	}

	return (
		<Stack as="section" spacing="6" {...props}>
			{/* <HeadingGroup title="Danger zone" description="Irreversible and destructive actions" /> */}
			{
				error &&
				<Alert status="warning">
					<AlertIcon />
					{error}
				</Alert>
			}
			<Text fontWeight="bold">Delete account and data</Text>
			<Text fontSize="sm" mt="1" mb="3">
				Once you delete your user, there is no going back. Please be certain.
			</Text>
			<Button size="sm" colorScheme="red" onClick={handleDelete}>
				Delete account
			</Button>
		</Stack>
	)
}