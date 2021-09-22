import React from 'react'
import {
	Box,
	Heading,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import { BsArrowRight } from 'react-icons/bs'

export const BlogGrid = ({ children, archiveLink }) => {
	return (
		<Box
			// bg={mode('gray.50', 'gray.800')}
			pt={{
				base: '6',
				sm: '12',
			}}
		>
			<Box
				maxW={{
					base: 'xl',
					md: '7xl',
				}}
				mx="auto"
				px={{
					base: '0',
					sm: '8',
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
					mb={{base:"4",sm:"6"}}
				>
					{ children }
				</SimpleGrid>
				<LinkBox to={archiveLink} fontSize="xl" fontWeight="bold" color="gray.800" ml={{base:"2"}}>
					<LinkOverlay as={Link} to={archiveLink}><span>View all articles</span></LinkOverlay>
					<Box as={BsArrowRight} display="inline-block" ms="2" />
				</LinkBox>
			</Box>
		</Box>
	)
}
