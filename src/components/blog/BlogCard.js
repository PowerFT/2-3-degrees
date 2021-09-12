import React from 'react'
import {
	Flex,
	Heading,
	LinkBox,
	LinkOverlay,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export const BlogCard = ({ postData }) => {
	
	//console.log(postData)
	const { id, title, uri, featuredImage, date } = postData

	const image = getImage(featuredImage?.node?.localFile)
	const altText = featuredImage?.node?.localFile?.altText

	return (
		<LinkBox
			id={id}
			as="article"
			overflow="hidden"
			transition="all 0.2s"
			_hover={{
				shadow: {
					sm: 'lg',
				},
				bg: {
					sm: mode('white', 'gray.700'),
				}
			}}
		>
			<Flex direction="column">
				<GatsbyImage alt={altText} image={image} />
				<Flex
					direction="column"
					// px={{
					// 	sm: '6',
					// }}
					py="5"
					pl="3"
					pr="9"
				>
					<Heading as="h3" size="lg" mb="2" noOfLines={2}>
						<LinkOverlay as={Link} to={`/blog${uri}`}>{title}</LinkOverlay>
					</Heading>
					<Flex
						align="baseline"
						justify="space-between"
						fontSize="sm"
						color={mode('gray.600', 'gray.400')}
					>
						<Text href="#">
							{date}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</LinkBox>
	)
}