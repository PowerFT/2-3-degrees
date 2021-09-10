import { Avatar, Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
// import { motion } from 'framer-motion';
// const MotionBox = motion(Box)

export const Header = ({title, subTitle, imageData, imgAlt, pageType, avatar, blogAuthor}) => {

	
	// const imageData = getImage(image)
	console.log("header",imageData)
  // const ImgAlt = post.featuredImage?.node?.alt || ``
	
	// const colour = {
	// 	admin: "dBlue.200",
	// 	connectPage: "dOrange.300",
	// }

	const hidden = pageType === "home" || pageType === "connectHome" || pageType === "login"

	console.log(pageType)
	return (
		<Flex 
			className="page__header" 
			textAlign={{ base: 'center', md: 'start', lg: 'start' }} 
			direction={{
				base:"column", sm:"column", md:"row"
			}}
			minH= {{
				md: "300px",
				lg: "400px",
			}}
			w="full"
			// bg={colour.pageType}
			bg="pink.100"
			minH="40vh"
			h={{
				base:"auto", sm:"auto", md:"40vh"
			}}
			position="relative"
			display={hidden ? "none" : "flex"}
		>
			<Flex 
				flex={imageData ? "1 1 50%" : "1"} 
				px={imageData ? "10" : "0"} 
				py="10"
				ml={{md: "0", lg: imageData ? "0" : "280px"}} 
				color="gray.800" 
				direction="column"
				justifyContent="space-between"
				align={{sm: "center", md: "center", lg: "flex-start"}}
			>
				<VStack>
					<Heading
						className="page__header--title"
						fontSize={{
							base: pageType === "blog" ? "3rem" : "3rem", 
							sm: pageType === "blog" ? "4rem" : "4rem",
							md: pageType === "blog" ? "2.5rem" : "4rem"
						}}
						lineHeight={{
							base: pageType === "blog" ? "3.2rem" : "3.2rem", 
							sm: pageType === "blog" ? "4.2rem" : "4.3rem",
							md: pageType === "blog" ? "2.7rem" : "4.3rem"
						}}
						w="full"
						textAlign={{md: pageType === "blog" ? "start" : "center", lg: "start"}}
						// noOfLines={2}
					> 
						{title}
					</Heading>
					{
						blogAuthor && (
						<Text
							className="pageblock__header--author"
							fontSize="xl"
							mt="4"
							maxW="lg"
							mx={{ base: 'auto', lg: 'unset' }}
						>
							{blogAuthor}
						</Text>
						)
					}
				</VStack>
				<Text
					className="pageblock__header--subtitle"
					fontSize={{ base: pageType === "blog" ? 'sm' : "xl", lg: pageType === "blog" ? 'sm' : "2xl" }}
					mt="6"
					maxW="2xl"
					mx={{ base: 'auto', lg: 'unset' }}
					noOfLines="5"
				>
					{subTitle}
				</Text>
			</Flex>
			{imageData && (
				<Box className="pageblock__header--imagecontainer" position="relative" w="full" h="full" flex="1 1 50%">
					<GatsbyImage
						className="pageblock__image--img"
						image={imageData}
						alt={imgAlt ? imgAlt : "header image"}
						// loading="eager"
					/>
				</Box>
			)}
			{
				avatar && (
					<Avatar size="xl" name={subTitle} bottom="0" right="0" position="absolute" m="6"/>
				)
			}
		</Flex>
	)
}
