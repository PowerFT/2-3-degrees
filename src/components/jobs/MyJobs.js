/**
* External dependencies
*/
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Heading, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
/**
* External dependencies
*/
// import { useAuth } from '../../hooks'
import { ColumnContainter, MainColumn, SecondColumn } from '../layout/columns'
import { JobsList } from './my-jobs-list'
import { Select } from '@chakra-ui/select'
import { FormControl } from '@chakra-ui/form-control'
import { MySpinner } from '../waiting/MySpinner'

const MyJobs = () => {

	const [statusSelected, setStatusSelected] = useState('PUBLISH')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)


	if (loading) return <MySpinner />;
	if (error) return `Error! ${error}`;

	return (
		<ColumnContainter minH="100%">
			<SecondColumn w="250px">
				<VStack spacing={6} position="sticky" top="0">
					<Heading alignSelf="flex-start">My Jobs</Heading>
					<FormControl id="myJobsSelect">
						<Select onChange={(e) => setStatusSelected(e.target.value)}>
							<option value="PUBLISH">Published</option>
							<option value="DRAFT">Pending</option>
						</Select>
					</FormControl>
					<Button as={Link} to="/maker/jobs/post" w="100%" mt="2">
						Post a job
					</Button>
				</VStack>
			</SecondColumn>
			<MainColumn>
				<JobsList setError={setError} setLoading={setLoading} statusSelected={statusSelected} />
			</MainColumn>
		</ColumnContainter>
	);
}

export default MyJobs