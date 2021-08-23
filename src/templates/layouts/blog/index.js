import React from 'react'
import {
	Box,
	Flex,
	Heading,
	Img,
	Link,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import { BsArrowRight } from 'react-icons/bs'

const Blog = (props) => {
	const { title, href, description, media, author, category, date } = props

	// console.log([author, date, href])
	return (
		<LinkBox
			as="article"
			bg={{
				sm: mode('white', 'gray.700'),
			}}
			shadow={{
				sm: 'base',
			}}
			rounded={{
				sm: 'md',
			}}
			overflow="hidden"
			transition="all 0.2s"
			_hover={{
				shadow: {
					sm: 'lg',
				},
			}}
		>
			<Flex direction="column">
				<Img height="60" objectFit="cover" alt={title} src={media} />
				<Flex
					direction="column"
					px={{
						sm: '6',
					}}
					py="5"
				>
					<Text
						casing="uppercase"
						letterSpacing="wider"
						fontSize="xs"
						fontWeight="semibold"
						mb="2"
						color="gray.500"
					>
						{category}
					</Text>
					<Heading as="h3" size="sm" mb="2" lineHeight="base">
						<LinkOverlay href={href}>{title}</LinkOverlay>
					</Heading>
					<Text noOfLines={2} mb="8" color={mode('gray.600', 'gray.400')}>
						{description}
					</Text>
					<Flex
						align="baseline"
						justify="space-between"
						fontSize="sm"
						color={mode('gray.600', 'gray.400')}
					>
						<Text>
							By{' '}
							<Box as="a" textDecor="underline" href="#">
								{author}
							</Box>
						</Text>
						<Link href="#">
							{date}
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</LinkBox>
	)
}

export const LatestBlog = ({ blogPosts }) => {
	// console.log(blogPosts)
	return (
		<Box
			as="section"
			bg={mode('gray.50', 'gray.800')}
			py={{
				base: '10',
				sm: '24',
			}}
		>
			<Box
				maxW={{
					base: 'xl',
					md: '7xl',
				}}
				mx="auto"
				px={{
					base: '6',
					md: '8',
				}}
			>
				<Heading size="xl" mb="8" fontWeight="extrabold">
					Featured Articles
				</Heading>
				<SimpleGrid
					columns={{
						md: 1,
						lg: 3
					}}
					spacing="12"
					mb="10"
				>
					{
						blogPosts.map(post => {
							// console.log(post)
							const { id, date, excerpt, uri, title, author, categories, featuredImage } = post
							const blogAuthor = author.node.name
							const category = categories.nodes[0].name
							const imageSrc = featuredImage.node.localFile.childImageSharp.fluid.src
							return (
								<Blog
									key={id}
									category={category}
									media={imageSrc}
									title={title}
									description={excerpt}
									href={uri}
									author={blogAuthor}
									date={date}
								/>
							)
						})
					}

				</SimpleGrid>
				<Link fontSize="xl" fontWeight="bold" color={mode('blue.600', 'blue.400')}>
					<span>View all articles</span>
					<Box as={BsArrowRight} display="inline-block" ms="2" />
				</Link>
			</Box>
		</Box>
	)
}