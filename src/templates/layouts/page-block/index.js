import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import parse from "html-react-parser"
import { Header } from '../../../components/layout/Header'

export const PageBlock = ({ title, subTitle, content, image, headerBgCol, textColour, ...rest }) => {

	const imageData = getImage(image?.localFile)
	const pagetype="page"
	//console.log("page",image)
	//console.log("page image data",imageData)
	return (
		<>
			<Header
				title={title}
				subTitle={subTitle}
				imageData={imageData}
				pagetype={pagetype}
				pageHeaderBgCol={headerBgCol}
				pageHeaderTextColour={textColour}
			/>
			<Flex w="100%">
				<Box className="pageblock__body--content wp-content" maxW="2xl" mx="auto" my="12" px="12">
						{parse(content)}
					</Box>
			</Flex>
		</>
	)
}
