import { Button, Stack, Text, Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import { DangerZoneCard } from './DangerZoneCard'
import { useDeleteJobPost } from '../../../hooks'

export const DangerZone = ( props ) => {
	
	const userId = props.jobPostId
	const { deleteJobPost, error, status } = useDeleteJobPost(userId)


	const handleDelete = () => (
		deleteJobPost()
	)

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
			<DangerZoneCard>
				<Text fontWeight="bold">Delete job</Text>
				<Text fontSize="sm" mt="1" mb="3">
					Once you delete this job, there is no going back. Please be certain.
				</Text>
				<Button size="sm" colorScheme="red" onClick={handleDelete}>
					Delete Job
				</Button>
			</DangerZoneCard>
		</Stack>
	)
}