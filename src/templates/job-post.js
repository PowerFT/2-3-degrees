import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
// import { motion } from "framer-motion"
import { Box } from "@chakra-ui/layout"
import { Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { InnerSidebar } from "../components/layout/InnerSidebar"
import { Header } from "../components/layout/Header"
import { Content } from "../components/layout/Content"

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

// const MotionBox = motion(Box)
// const MotionHeading = motion(Heading)

const JobPostTemplate = ({ data: { jobPost } }) => {

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
	const skills = jobPost?.skills
	console.log(jobPost)

	const pageType = "job-post"

  return (
		<>
			<Header
				title={title}
				subTitle={companyName}
				avatar={companyName}
				pageType={pageType}
			/>
			<Flex w="100%">
				<InnerSidebar
					jobLocation={jobLocation}
					sector={sector}
					jobType={jobType}
					jobSkills={skills}
					salary={salary}
					pageType={pageType}
					applicationLink={applicationLink}
					companyBio={companyBio}
          closeDate={closeDate}
				/>
				<Content>
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
			date(fromNow: true)
			companyName {
				nodes {
					name
				}
			}
		}
	}
`
