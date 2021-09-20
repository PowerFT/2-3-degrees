import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Heading, Stack, Text, useColorModeValue as mode,
} from '@chakra-ui/react'

export const ConnectHero = ({user, ...rest}) => {

	return (
			<Box
				as="section"
				bg={mode('gray.50', 'gray.800')}
				pb="24"
				w="full"
				pos="relative"
				px={{
					base: '6',
					lg: '12',
				}}
			>
				<Box maxW="7xl" mx="auto">
					<Box
						maxW={{
							lg: 'md',
							xl: 'xl',
						}}
						pt={{
							base: '20',
							lg: '40',
						}}
						pb={{
							base: '16',
							lg: '24',
						}}
					>
						<Heading as="h1" size="3xl" lineHeight="1" fontWeight="extrabold" letterSpacing="tight">
							Connect Platform
						</Heading>
						<Text mt={4} fontSize="xl" fontWeight="medium" color={mode('gray.600', 'gray.400')}>
							The place to connect with opportunities
						</Text>
					</Box>
				</Box>
				<Box
					pos={{
						lg: 'absolute',
					}}
					insetY={{
						lg: '0',
					}}
					insetEnd={{
						lg: '0',
					}}
					bg="gray.50"
					w={{
						base: 'full',
						lg: '50%',
					}}
					height={{
						base: '96',
						lg: 'full',
					}}
					sx={{
						clipPath: {
							lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
						},
					}}
				>
					<StaticImage
						src="../../images/testImage1.jpg"
					/>
				</Box>
			</Box>
	)
}
