import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
// import { motion } from "framer-motion"
import { Box } from "@chakra-ui/layout"
import { Flex, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, VStack, HStack, Icon, Button } from "@chakra-ui/react"
import { InnerSidebar } from "../components/layout/InnerSidebar"
import { Header } from "../components/layout/Header"
import { Content } from "../components/layout/Content"
import { HiOutlineClock, HiOutlineCurrencyPound, HiOutlineLocationMarker } from "react-icons/hi"
import { ChevronRightIcon } from "@chakra-ui/icons"

const JobPostTemplate = ({ data: { jobPost } }) => {
	console.log(jobPost)

	const title = jobPost?.title
	const companyName = jobPost?.companyName?.nodes[0]?.name
	const sector = jobPost?.sector?.nodes[0]?.name
	const jobType = jobPost?.jobType?.nodes[0]?.name
	const jobLocation = jobPost?.jobLocation?.nodes[0]?.name
	const salary = jobPost?.salary
	const applicationLink = jobPost?.applicationLink
	const companyBio = jobPost?.companyBio
	const closeDate = jobPost?.closeDate
	const content = jobPost?.content
	const salaryStructure = jobPost?.salaryStructure?.nodes[0]?.name
	const skills = jobPost?.skills?.nodes
	// const skills = [{name: "Approachable"}, {name: "Creativity"}, {name: "Humble"}]
	console.log(skills.length)

	const pagetype = "job-post"

	const formattedSalary = parseInt(salary).toLocaleString() 


	const BreadCrumb = () => {
		return (
			<Breadcrumb spacing="1" w="fit-content" separator={<ChevronRightIcon color="gray.300" />}>
				<BreadcrumbItem m="0">
					<BreadcrumbLink as={Link} bg="gray.300" rounded="full" fontSize="sm" py=".5" px="3" to="/connect/platform"  >
						Connect Platform
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem m="0">
					<BreadcrumbLink as={Link} to="/connect/jobs" fontSize="sm" bg="gray.300" rounded="full" py=".5" px="3">
						Opportunity Board
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem m="0" isCurrentPage bg="gray.300" rounded="full" py=".5" px="3" >
					<Text maxW="120px" fontSize="sm" isTruncated>{title}</Text>
				</BreadcrumbItem>
			</Breadcrumb>
		)
	}

  return (
		<>
			<Header
				title={title}
				subTitle={companyName}
				avatar={companyName}
				pagetype={pagetype}
			/>
			<Flex w="100%">
				<InnerSidebar
					jobLocation={jobLocation}
					sector={sector}
					jobType={jobType}
					jobSkills={skills}
					salary={salary}
					pagetype={pagetype}
					applicationLink={applicationLink}
					companyBio={companyBio}
          closeDate={closeDate}
					companyName={companyName}
					salaryStructure={salaryStructure}
				/>

				<Content mt="5">

					<Box maxW="xl" w="100%">
						<BreadCrumb justifySelf="flex-start"/>
					</Box>




					<Box py="6" px="8" mt="5" maxW="xl" w="100%" bg="gray.300" display={{base: "block", lg:"none"}}>
						<Box fontSize="lg" w="full">
							<HStack justify="space-between">
								<Text fontWeight="700" letterSpacing="widest" fontSize="xs">KEY SKILLS:</Text>
								{skills.length !== 0 && (
									<HStack spacing="2" align="flex-start">
										{
											skills?.map((skill, i) => (
												<HStack
													key={i}
												>
													<Flex align="center" bg="dYellow.300" _hover={{bg:"dYellow.400"}} rounded="full" pt="1" pb="0.5" px="3"><Text cursor="default" fontWeight="700" letterSpacing="widest" fontSize="xs" color="gray.200">{skill.name.toLocaleUpperCase()}</Text></Flex>
													{/* <Icon as={HiOutlineHand} w={8} h={8}/> */}
													{/* <Text>{skill.name}</Text> */}
												</HStack>
											))
										}
									</HStack>
								)}
							</HStack>
							<Stack wrap="wrap" spacing="2" align="flex-start" mt={skills.length !== 0 ? "4" : "0"} w="full">
								<HStack bg="gray.50" px="1" py="0.5" spacing="1" rounded="full" w="full">
									<Icon as={HiOutlineCurrencyPound} w={8} h={8}/>
									<Flex align="center" bg="dBlue.300" rounded="full" pt="1" pb="0.5" px="3"><Text fontWeight="700" letterSpacing="widest" fontSize="xs" color="#e8fffe">SALARY:</Text></Flex>
									<Text px="2" fontSize="md">£{formattedSalary}/{salaryStructure}</Text>
								</HStack>
								<HStack bg="gray.50" px="1" py="0.5" spacing="1" rounded="full" w="full">
									<Icon as={HiOutlineLocationMarker} w={8} h={8}/>
									<Flex align="center" bg="dYellow.300" rounded="full" pt="1" pb="0.5" px="3"><Text fontWeight="700" letterSpacing="widest" fontSize="xs" color="#fff6e3">LOCATION:</Text></Flex>
									<Text px="2" fontSize="md">{jobLocation}</Text>
								</HStack>
								<HStack bg="gray.50" px="1" py="0.5" spacing="1" rounded="full" w="full">
									<Icon as={HiOutlineClock} w={8} h={8}/>
									<Flex align="center" bg="dOrange.300" rounded="full" pt="1" pb="0.5" px="3"><Text fontWeight="700" letterSpacing="widest" fontSize="xs" color="#ffe6d4">CONTRACT TYPE:</Text></Flex>
									<Text px="2" fontSize="md">{jobType}</Text>
								</HStack>
							</Stack>
						</Box>

						<Stack direction="column" spacing={4} mt="4" align="center"  alignItems="stretch" w="full">
						
							<Flex p="0" w="100%" bg="gray.50" border="2px solid" borderColor="gray.700">
								<Flex align="center" px="2" py="1" bg="gray.700" w="fit-content">
									<Text color="gray.200" fontWeight="700" letterSpacing="widest" fontSize="xs">DEADLINE:</Text>
								</Flex>
								<Box px="2" py="1" bg="gray.50">
									<Text>{closeDate}</Text>
								</Box>
							</Flex>
							
							<a href={`https://${applicationLink}`} target="_blank" rel="noreferrer">
								<Button size="md" w="sm" color="dBlue.300" bg="gray.700" rounded="full" variant="solid" w="full" _hover={{bg:"gray.600"}}>
										Apply
								</Button>
							</a>	
						</Stack>
					</Box>




					<Box mt="10" borderRadius="lg" maxW="xl" position="relative" overflow="hidden" bg="white" p="10" mb="12">
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
				</Content>
			</Flex>
		</> 
  )
}

export default JobPostTemplate

export const jobPostQuery = graphql`
	query JobPostQuery($id: String!) {
		jobPost: wpJobPost(id: {eq: $id}) {
			closeDate
			companyBio
			applicationLink
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
			salaryStructures {
				nodes {
					name
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
