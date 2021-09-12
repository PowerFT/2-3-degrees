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
import { JobsList } from './my-jobs-list'
import { FormControl } from '@chakra-ui/form-control'
import { MySpinner } from '../waiting/MySpinner'
import { Accordion, AccordionButton, AccordionPanel, AccordionItem, Box, Flex } from '@chakra-ui/react'
import { InnerSidebar } from '../layout/InnerSidebar'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const MyJobs = () => {
 
	const [statusSelected, setStatusSelected] = useState('PUBLISH')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	// console.log('MYYYYY JOBSSSS')

	if (loading) return <MySpinner />;
	if (error) return `Error! ${error}`;

	return (
		<Flex h="fit-content" position="relative" bg="gray.100"  className="myjobs" w="full">
			<InnerSidebar>
				<VStack spacing={6} position="sticky" top="0">
					<Heading alignSelf="flex-start">My Jobs</Heading>
					<FormControl id="myJobsSelect">
					{/* <Select bg="gray.400" onChange={(e) => setStatusSelected(e.target.value)}>
							<option value="PUBLISH">Published</option>
							<option value="DRAFT">Pending</option>
						</Select> */}
					<Accordion allowMultiple mt="2">
						<AccordionItem>
							{({ isExpanded }) => (
								<>
									<h2>
										<AccordionButton px="0" borderBottom="1px solid">
											<Box flex="1" textAlign="left" >
												Job Post Status
											</Box>
											{isExpanded ? (
												<MinusIcon fontSize="12px" />
											) : (
												<AddIcon fontSize="12px" />
											)}
										</AccordionButton>
									</h2>
									<AccordionPanel p={0} bg="gray.300" maxH="200px" overflow="auto">
										<Box
											width="100%"
											py="1"
											px="1"
											fontSize="sm"
											cursor="pointer"
											_hover={{ bg: "#ebedf0" }}
											_active={{
												bg: "#dddfe2",
												transform: "scale(0.98)",
												borderColor: "#bec3c9",
											}}
											onClick={(e) => setStatusSelected("PUBLISH")}
										>
											Published
										</Box>
										<Box
											width="100%"
											py="1"
											px="1"
											fontSize="sm"
											cursor="pointer"
											_hover={{ bg: "#ebedf0" }}
											_active={{
												bg: "#dddfe2",
												transform: "scale(0.98)",
												borderColor: "#bec3c9",
											}}
											onClick={(e) => setStatusSelected("DRAFT")}
										>
											Pending
										</Box>
									</AccordionPanel>
								</>
							)}
						</AccordionItem>
					</Accordion>
					</FormControl>
					<Button as={Link} to="/maker/jobs/post" w="100%" mt="2" colorScheme="green">
						Post a job
					</Button>
				</VStack>
			</InnerSidebar>
			<Box>
				<JobsList setError={setError} setLoading={setLoading} statusSelected={statusSelected} />
			</Box>
		</Flex>
	);
}

export default MyJobs