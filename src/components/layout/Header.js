import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
// import { motion } from 'framer-motion';
// const MotionBox = motion(Box)

export const Header = ({title, subTitle, image, pageType, avatar}) => {

	console.log(image)

	const imageData = getImage(image)
  // const ImgAlt = post.featuredImage?.node?.alt || ``
	
	const colour = {
		admin: "dBlue.200",
		connectPage: "dOrange.300",
	}

	const hidden = pageType === "home" || pageType === "connectHome" || pageType === "login"

	return (
		<Flex 
			className="page__header" 
			textAlign={{ base: 'center', md: 'start', lg: 'start' }} 
			direction={[
				"column", "column", "row"
			]}
			height= {{
				md: "300px",
				lg: "400px",
			}}
			w="full"
			// bg={colour.pageType}
			bg="pink.100"
			h="40vh"
			position="relative"
			display={hidden ? "none" : "flex"}
		>
			<Flex 
				flex={image ? "1 1 50%" : "1"} 
				px={image ? "10" : "0"} 
				py="10"
				ml={{md: "0", lg: image ? "0" : "280px"}} 
				color="gray.800" 
				direction="column"
				justifyContent="space-between"
				align={{sm: "center", md: "center", lg: "flex-start"}}
			>
				<Heading
					className="page__header--title"
					size="4xl"
					maxW="lg"
					textAlign={{md: "center", lg: "start"}}
					// noOfLines={2}
				> 
					{title}
				</Heading>
				<Text
					className="pageblock__header--subtitle"
					fontSize={{ base: 'xl', lg: '2xl' }}
					mt="4"
					maxW="2xl"
					mx={{ base: 'auto', lg: 'unset' }}
				>
					{subTitle}
				</Text>
			</Flex>
			{image && (
				<Box position="relative" w="full" h="full" flex="1 1 50%">
					<GatsbyImage
						className="pageblock__image--img"
						image={imageData}
						// alt={image.altText}
						objectFit="cover"
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
