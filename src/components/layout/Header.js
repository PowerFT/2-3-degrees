import { Avatar, Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { getImage, GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
// const MotionBox = motion(Box)

export const Header = ({title, subTitle, imageData, imgAlt, pageType, avatar, blogAuthor}) => {

	
	// const imageData = getImage(image)
	//console.log("header",imageData)
  // const ImgAlt = post.featuredImage?.node?.alt || ``
	
	// const colour = {
	// 	admin: "dBlue.200",
	// 	connectPage: "dOrange.300",
	// }

	const hidden = pageType === "home" || pageType === "connect-home" || pageType === "login"

	//console.log(pageType)
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
			bg="dOrange.300"
			minH={{base:"30vh", sm: "40vh"}}
			h={{
				base:"auto", sm:"auto", md:"40vh"
			}}
			position="relative"
			overflow="hidden"
			display={hidden ? "none" : "flex"}
		>
			{ pageType === "admin" && <StaticImage 
				src="../../images/adminBg.svg" 
				alt="shape pattern"
				// height={400}
				fit="cover"
				imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
				style={{height:"100%", width:"auto", position:"absolute", zIndex:"1"}}
			/>}
			{ pageType === "myjobs" && <StaticImage 
				src="../../images/myJobsBg.svg" 
				alt="shape pattern"
				// height={400}
				fit="cover"
				imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
				style={{height:"100%", width:"auto", position:"absolute", zIndex:"1"}}
			/>}
			{ pageType === "job-form" && <StaticImage 
				src="../../images/postJobBg.svg" 
				alt="shape pattern"
				// height={400}
				fit="cover"
				imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
				style={{height:"100%", width:"auto", position:"absolute", zIndex:"1"}}
			/>}
			<Flex 
				flex={imageData ? "1 1 50%" : "1"} 
				px={imageData ? "10" : "0"} 
				py={{base: "6", sm: "10"}}
				ml={{md: "0", lg: imageData ? "0" : "280px"}} 
				color="gray.800" 
				direction="column"
				justifyContent="space-between"
				align={{base: "center", md: "center", lg: "flex-start"}}
				zIndex="10"
			>
				<VStack maxW={{base: "xs", md: "lg"}}>
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
						color="gray.50"
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
					color="gray.50"
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
