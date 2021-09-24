import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import parse from "html-react-parser"
import { Header } from '../../../components/layout/Header'

export const PageBlock = ({ title, subTitle, content, image, ...rest }) => {

	const imageData = getImage(image?.localFile)
	const pageType="page"
	//console.log("page",image)
	//console.log("page image data",imageData)
	return (
		<>
			<Header
				title={title}
				subTitle={subTitle}
				imageData={imageData}
				pageType={pageType}
			/>
			<Flex w="100%">
				<Box className="pageblock__body--content wp-content" maxW="2xl" mx="auto" my="12" px="12">
						{parse(content)}
					</Box>
			</Flex>
		{/* <Box className="pageblock" { ...rest } >
			<Flex 
				className="pageblock__header" 
				textAlign={{ base: 'center', md: 'start', lg: 'start' }} 
				direction={[
					"column", "column", "row"
				]}
				height= {{
					md: "300px",
					lg: "400px",
				}}
			>
				<Box flex="1 1 50%" p="10" color="gray.800">
					<Heading
						className="pageblock__header--title"
						size="4xl"
					> 
						{parse(title)}
					</Heading>
					<Text
						className="pageblock__header--subtitle"
						fontSize={{ base: 'xl', lg: '2xl' }}
						mt="4"
						maxW="2xl"
						mx={{ base: 'auto', lg: 'unset' }}
					>
						{parse(subTitle)}
					</Text>
				</Box>
				{image && (
					<Box position="relative" w="full" h="full" flex="1 1 50%">
						<GatsbyImage
							className="pageblock__image--img"
							image={imageData}
							alt={image.altText}
							objectFit="cover"
							// loading="eager"
						/>
					</Box>
				)}
			</Flex>
			 <Box
				className="pageblock__body"
				bg="dOrange.200"
				p={[
					"1.5rem",
					"1.5rem",
					"3rem"
				]}
			>
				<Box className="pageblock__body--content wp-content" maxW="xl" mx="auto">
					{parse(content)}
				</Box>
			</Box> 
		</Box>*/}
		</>
	)
}
