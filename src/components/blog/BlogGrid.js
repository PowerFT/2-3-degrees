import React from 'react'
import {
	Box,
	Heading,
	SimpleGrid,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import { BsArrowRight } from 'react-icons/bs'

export const BlogGrid = ({ children, archiveLink }) => {
	return (
		<Box
			as="section"
			// bg={mode('gray.50', 'gray.800')}
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
				<SimpleGrid
					columns={{
						sm: 1,
						md: 3,
						// lg: 3
					}}
					spacing={{
						// sm: 6,
						md: 6,
						lg: 12
					}}
					mb="10"
				>
					{ children }
				</SimpleGrid>
				<Link to={archiveLink} fontSize="xl" fontWeight="bold" color="gray.800">
					<span>View all articles</span>
					<Box as={BsArrowRight} display="inline-block" ms="2" />
				</Link>
			</Box>
		</Box>
	)
}
