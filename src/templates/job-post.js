import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import { motion } from "framer-motion"
import { Box } from "@chakra-ui/layout"
import { Text, Button, Flex, Heading, HStack, Icon, Stack, Spacer, Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from "@chakra-ui/react"
import { HiOutlineClock, HiOutlineCurrencyPound, HiOutlineHand, HiOutlineLocationMarker } from "react-icons/hi"
import { InnerSidebar } from "../components/layout/InnerSidebar"

const JobSidebar = ({salary, jobLocation, sector, skills, jobType, ...rest}) => {

	const formattedSalary = parseInt(salary).toLocaleString() 

	return (
		<InnerSidebar className="inner-sidebar">
			<Box p="4" fontSize="lg">
				<VStack spacing="2" align="flex-start">
					{
						skills.nodes?.map(skill => (
							<HStack>
								<Icon as={HiOutlineHand} w={8} h={8}/>
								<Text>{skill.name}</Text>
							</HStack>
						))
					}
				</VStack>
				<VStack spacing="2" align="flex-start" mt="6">
					<HStack>
						<Icon as={HiOutlineCurrencyPound} w={8} h={8}/>
						<Text>{formattedSalary}</Text>
					</HStack>
					<HStack>
						<Icon as={HiOutlineLocationMarker} w={8} h={8}/>
						<Text>{jobLocation}</Text>
					</HStack>
					<HStack>
						<Icon as={HiOutlineClock} w={8} h={8}/>
						<Text>{jobType}</Text>
					</HStack>
				</VStack>
			</Box>

			<Spacer />

			<Stack direction="column" spacing={4} align="center"  alignItems="stretch">
				<Button colorScheme="teal" variant="outline">
					Company Website
				</Button>
				<Button colorScheme="teal" variant="solid">
					Apply
				</Button>
				<Button colorScheme="teal" variant="solid">
					Save
				</Button>
			</Stack>

		</InnerSidebar>
	)
}

const JobContent = ({content}) => (
	<Box borderRadius="lg" maxW="xl" position="relative" overflow="hidden" bg="white" p="10" mb="12">
		<Box className="wp-content">
			{parse(content)}
		</Box>
		<Box  
			position="absolute"
			bottom="0px"
			top="0px"
			right="0px"
			w="4px"
			bg="dyellow.300"
		/>
	</Box>
)


export const BreadCrumb = () => {
	return (
		<Breadcrumb bg="dBlue.200" w="fit-content" px={2} py={0}>
			<BreadcrumbItem m="0">
				<BreadcrumbLink as={Link} to="/connect/platform">
					Connect Platform
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbItem m="0">
				<BreadcrumbLink as={Link} to="/connect/jobs">
					Jobs Board
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbItem m="0" isCurrentPage>
				<BreadcrumbLink>Job</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	)
}

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)

const JobPostTemplate = ({ data: { jobPost } }) => {

	const title = jobPost?.title
	const companyName = jobPost?.companyName?.nodes[0]?.name
	const sector = jobPost?.sector?.nodes[0]?.name
	const jobType = jobPost?.jobType?.nodes[0]?.name
	const jobLocation = jobPost?.jobLocation?.nodes[0]?.name
	const salary = jobPost?.salary
	const content = jobPost?.content
	const skills = jobPost?.skills
	//console.log(jobPost)

  return (
		<>
			<Box w="full" bg="gray.50">
				<Box py="6" w="full" bg="dOrange.100" position="relative" h="40vh" borderBottom="1px solid" borderColor="dOrange.300">
					<Flex 
						direction="column"
						h="100%"
						justifyContent="space-between"
						overflow="hidden"
					>
						<MotionHeading 
							size="3xl" 
							maxW="xl" 
							ml="280px"
							key="jobPostTitle"
							initial={{ opacity: 0, y: -400 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -400 }}
							transition={{duration: 1}}
						>
							{title}
						</MotionHeading>
						<Text fontSize="3xl" ml="280px" justifySelf="flex-end">{companyName}</Text>
					</Flex>
					<Avatar size="xl" name={companyName} bottom="0" right="0" position="absolute" m="6"/>
				</Box>
				<Flex h="fit-content" position="relative" overflow="auto">
					<JobSidebar 
						jobLocation={jobLocation}
						sector={sector}
						skills={skills}
						salary={salary}
						jobType={jobType}
					/>

					<Flex direction="column">

						<BreadCrumb />

						<MotionBox
							key="jobPost"
							initial={{ opacity: 0, x: 400 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 400 }}
							transition={{
								type: "spring",
								mass: 0.15,
								stiffness: 115,
								duration: 1
							}}
							p="12" 
							h="fit-content"
						>
							<JobContent content={content}/>
						</MotionBox>
					</Flex>
				</Flex>
			</Box>
		</>

  )
}

export default JobPostTemplate

export const pageQuery = graphql`
	query JobPostQuery($id: String!) {
		jobPost: wpJobPost(id: {eq: $id}) {
			closeDate
			companyBio
			content
			id
			salary
			status
			title
			uri
			sector {
				nodes {
					name
				}
			}
			jobType {
				nodes {
					name
				}
			}
			jobLocation {
				nodes {
					name
				}
			}
			skills {
        nodes {
          name
					id
        }
      }
			date(fromNow: true)
			companyName {
				nodes {
					name
				}
			}
		}
	}
`
