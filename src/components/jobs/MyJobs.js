/**
* External dependencies
*/
import React, { useState } from 'react'
import { Flex } from '@chakra-ui/layout'
/**
* External dependencies
*/
// import { useAuth } from '../../hooks'
import { JobsList } from './my-jobs-list'
import { MySpinner } from '../waiting/MySpinner'
import { InnerSidebar } from '../layout/InnerSidebar'
import { Header } from '../layout/Header'
import { Content } from '../layout/Content'

const MyJobs = () => {
 
	const [statusSelected, setStatusSelected] = useState('PUBLISH')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const pageType = "myjobs"

	if (loading) return <MySpinner />;
	if (error) return `Error! ${error}`;
 
	return (
		<>
			<Header
        title="My Opportunities"
        subTitle="Edit, view your opportunity posts"
        pageType={pageType}
      />
			<Flex w="100%" id="flex">
				<InnerSidebar
					pageType={pageType}
					setStatusSelected={setStatusSelected}
				/>	
				<Content>
					<JobsList setError={setError} setLoading={setLoading} statusSelected={statusSelected} />
				</Content>
			</Flex>
		</>
	);
}

export default MyJobs