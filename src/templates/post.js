import React from "react"
import { graphql } from "gatsby"
// import Image from "gatsby-image"
// import parse from "html-react-parser"
// import { Box } from "@chakra-ui/layout"
// import { ControlBox } from "@chakra-ui/control-box"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.css"
// import "../css/@wordpress/block-library/build-style/theme.css"

// import Bio from "../components/"
// import Seo from "../components/seo"

// const PageContainer = ({ children }) => (
// 	<Box
// 		id="pageContainer"
// 		display="flex"
// 		justifyContent="center"
// 		w="100%"
// 		h='100%'
// 		bgColor="grey"
// 		maxW="1024px"
// 		position="relative"
// 	>
// 		{ children }
// 	</Box>
// )

// const ContentBox = ({ children }) => (
// 	<Box
// 		id="contentBox"
// 		display="flex"
// 		maxW="800px"
// 		bgColor="lightgray"
// 		borderRadius="0.75rem"
// 		p={"1.2rem"}
// 		m={"1.2rem"}
// 		w="100%"
// 	>
// 		{ children }
// 	</Box>
// )

// const ColThird = ({ children }) => (
// 	<Box
// 		id="colThird"
// 		flexShrink="1"
// 		flexGrow="0"
// 		flexBasis="33.333%"
// 	>
// 		{ children }
// 	</Box>
// )

// const ColMain = ({ children }) => (
// 	<Box
// 		id="colMain"
// 		flexShrink="1"
// 		flexGrow="1"
// 	>
// 		{ children }
// 	</Box>
// )


const JobPostTemplate = ({ data: { post } }) => {
	console.log(post)
	// const title = jobPost.title
	// const companyName = jobPost.companyName.nodes[0].name
	// const sector = jobPost?.sector?.nodes[0].name
	// const jobType = jobPost.jobType.nodes[0].name
	// const jobLocation = jobPost.jobLocation.nodes[0].name
	// const salary = jobPost.salary.salary
	// const description = jobPost.content
	// console.log(jobPost)
	// console.log(sector)

  return (
    // <PageContainer>
		// 	<ContentBox>
		// 		<ColThird>
		// 			<Box
		// 				id="jobPostSide"
		// 				display="flex"
		// 				bgColor="lightblue"
		// 				borderRadius="0.75rem"
		// 				w="100%"
		// 				h="100%"
		// 			>
		// 			</Box>
		// 		</ColThird>
		// 		<ColMain>
		// 			<Box
		// 					id="jobPostSide"
		// 					display="flex"
		// 					bgColor="pink"
		// 					borderRadius="0.75rem"
		// 					w="100%"
		// 					h="100%"
		// 				>
		// 				</Box>
		// 		</ColMain>
		// 	</ContentBox>
		// </PageContainer>
    <p>post</p>
  )
}

export default JobPostTemplate

export const postQuery = graphql`
	query PostQuery($id: String!) {
		wpPost(id: {eq: $id}) {
			content
			id
			status
			title
			uri
			date(fromNow: true)
		}
	}
`
