import React, { useState } from 'react'
// import { Flex } from '@chakra-ui/layout'

import { ColumnContainter, MainColumn, SecondColumn } from '../../../components/layout/columns';
import { JobsFilterVariables } from "../../../components/jobs/jobs-board/jobs-filter-variables";
import { JobsBoardJobList } from "../../../components/jobs/jobs-board/jobs-list";
import { MySpinner } from '../../../components/waiting/MySpinner';

const ConnectJobs = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [locations, setLocations] = useState([])
	const [sectors, setSectors] = useState([])
	const [jobTypes, setJobTypes] = useState([])

	if (error) return <p>{`Error: ${error}`}</p>
	if (loading) return <MySpinner />
	// if(!data) return <p>No posts found.</p>

	return (
		<ColumnContainter bg="gray.50">
			<SecondColumn w="250px">
				{/* <Heading>Filter</Heading> */}
				<JobsFilterVariables
					error={error}
					loading={loading}
					setError={setError}
					setLoading={setLoading}
					locations={locations}
					setLocations={setLocations}
					sectors={sectors}
					setSectors={setSectors}
					jobTypes={jobTypes}
					setJobTypes={setJobTypes}
				/>
			</SecondColumn>
			<MainColumn>
				<JobsBoardJobList locations={locations} sectors={sectors} jobTypes={jobTypes} />
			</MainColumn>
		</ColumnContainter>
	)
}

export default ConnectJobs
