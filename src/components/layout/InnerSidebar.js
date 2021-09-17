import { Box, Flex, Heading, Icon, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {Link} from 'gatsby'
import { BsFillLightningFill, BsInfoCircleFill } from 'react-icons/bs'
// import { motion } from 'framer-motion';
// const MotionBox = motion(Box)
import {JobsFilter} from '../jobs/jobs-board/jobs-filter'
import { JobSidebar } from '../jobs/job-post/jobPostSidebar'

export const InnerSidebar = ({
	primaryLinks, 
	secondaryLinks, 
	pageType, 
	locations, 
	setLocations, 
	sectors, 
	setSectors, 
	jobTypes, 
	setJobTypes, 
	skills, 
	setSkills,
	jobLocation,
	sector,
	jobType,
	jobSkills,
	salary
}) => {
	
	// const colour = {
	// 	admin: "dBlue.200",
	// 	connectPage: "dOrange.300",
	// }

	const hidden = pageType === "blog" || pageType === "generic" || pageType === "home" || pageType === "connect-home" || pageType === "login"

	return (
		<Box 
			className="innersidebar sticky"
			bg="dBlue.300"
			w="280px"
			position="sticky"
			top="0"
			alignSelf="flex-start"
			h="100vh"
			p="4"
			flexShrink="0"
			display={{
				base: 'none',
				sm: "none",
				lg: hidden ? 'none' : 'block',
			}}
		>
			<VStack spacing="4" h="full">
				{
					primaryLinks && (
						<VStack spacing="0" border="1px solid" color="gray.50" w="100%" rounded="sm">
							<Flex align="center" bg="gray.50" fontSize="xs" textAlign="start" rounded="sm" color="pink.200" w="100%" py="1" pl="2"><Icon as={BsFillLightningFill} mr="1"/>Quick Links</Flex>
							{primaryLinks.map((link, i) => (
								<LinkBox 
									_hover={{ bg: 'whiteAlpha.400' }}
									borderBottom={i !== primaryLinks.length -1 ? "1px solid" : null}
									// borderColor="gray.50"
									w="100%"
									pt="1"
								>
									<LinkOverlay as={Link} to={link[1]}>
										<Heading size="md" color="inherit" px="2" py="1">{link[0]}</Heading>
									</LinkOverlay>
								</LinkBox>
							))}
						</VStack>
					)
				}
				{
					secondaryLinks && (
						<VStack spacing="0" border="1px solid" color="gray.50" w="100%" rounded="sm">
							<Flex align="center" bg="gray.50" fontSize="xs" textAlign="start" rounded="sm" color="pink.200" w="100%" py="1" pl="2"><Icon as={BsInfoCircleFill} mr="1"/>Useful Links</Flex>
							{secondaryLinks.map((link, i) => (
								<LinkBox 
									_hover={{ bg: 'whiteAlpha.400' }}
									borderBottom={i !== secondaryLinks.length -1 ? "1px solid" : null}
									// borderColor="gray.50"
									w="100%"
									pt="1"
								>
									<LinkOverlay as={Link} to={link[1]}>
										<Text fontSize="sm" color="inherit" px="2" py="1">{link[0]}</Text>
									</LinkOverlay>
								</LinkBox>
							))}
						</VStack>
					)
				}
				{
					pageType === "jobs-board" && (
						<JobsFilter 
							locations={locations}
							setLocations={setLocations}
							sectors={sectors}
							setSectors={setSectors}
							jobTypes={jobTypes}
							setJobTypes={setJobTypes}
							skills={skills}
							setSkills={setSkills}
						/>
					)
				}

				{
					pageType === "job-post" && (
						<JobSidebar
							jobLocation={jobLocation}
							sector={sector}
							jobType={jobType}
							jobSkills={jobSkills}
							salary={salary}
						/>
					)
				}
				
				{/* <Button variant="outline" color="gray.50" w="full" disabled={!completed}> Post an Opportunity</Button> */}
			</VStack>
		</Box>
	)
}
