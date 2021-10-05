import { Avatar, Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { getImage, GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
// const MotionBox = motion(Box)

export const Header = ({title, subTitle, imageData, imgAlt, pagetype, avatar, blogAuthor, pageHeaderBgCol, pageHeaderTextColour}) => {

	
	// const imageData = getImage(image)
	//console.log("header",imageData)
  // const ImgAlt = post.featuredImage?.node?.alt || ``
	
	// const colour = {
	// 	admin: "dBlue.200",
	// 	connectPage: "dOrange.300",
	// }

	const hidden = pagetype === "home" || pagetype === "connect-home" || pagetype === "login"

	//console.log(pagetype)
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
			// bg={colour.pagetype}
			bg={pageHeaderBgCol || "dYellow.300"}
			minH={{base:"30vh", sm: "40vh"}}
			h={{
				base:"auto", sm:"auto", md:"40vh"
			}}
			position="relative"
			overflow="hidden"
			display={hidden ? "none" : "flex"}
		>

			{ pagetype === "admin" && <StaticImage 
				src="../../images/adminBg.svg" 
				alt="shape pattern"
				// height={400}
				fit="cover"
				imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
				style={{height:"100%", width:"auto", position:"absolute", zIndex:"1"}}
			/>}

			{ pagetype === "myjobs" && <StaticImage 
				src="../../images/myJobsBg.svg" 
				alt="shape pattern"
				// height={400}
				fit="cover"
				imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
				style={{height:"100%", width:"auto", position:"absolute", zIndex:"1"}}
			/>}

			{ pagetype === "job-form" && <StaticImage 
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
				color="gray.50" 
				direction="column"
				justifyContent="space-between"
				align={{base: "center", md: "center", lg: "flex-start"}}
				zIndex="10"
			>
				<VStack maxW={{base: "xs", md: "lg"}}>
					<Heading
						className="page__header--title"
						fontSize={{
							base: pagetype === "blog" ? "3rem" : "3rem", 
							sm: pagetype === "blog" ? "4rem" : "4rem",
							md: pagetype === "blog" ? "2.5rem" : "4rem"
						}}
						lineHeight={{
							base: pagetype === "blog" ? "3.2rem" : "3.2rem", 
							sm: pagetype === "blog" ? "4.2rem" : "4.3rem",
							md: pagetype === "blog" ? "2.7rem" : "4.3rem"
						}}
						w="full"
						color={pageHeaderTextColour || "inherit"}
						textAlign={{md: pagetype === "blog" ? "start" : "center", lg: "start"}}
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
					fontSize={{ base: pagetype === "blog" ? 'sm' : "xl", lg: pagetype === "blog" ? 'sm' : "2xl" }}
					mt="6"
					maxW="2xl"
					mx={{ base: 'auto', lg: 'unset' }}
					noOfLines="5"
					color={pageHeaderTextColour || "inherit"}
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
