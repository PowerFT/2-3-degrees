import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import * as React from 'react'
import * as Logos from './Brands'

export const LogoGrid = () => {
	return (
		<Box bg="blue.600" color="white" as="section" pt="16" pb="24">
			<Box
				maxW={{
					base: 'xl',
					md: '5xl',
				}}
				mx="auto"
				px={{
					base: '6',
					md: '8',
				}}
			>
				<Box textAlign="center">
					<Heading size="lg" mb="4">
						Our Partners
					</Heading>
					<Text maxW="2xl" mx="auto">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua elit consectetur adipiscing.
					</Text>
				</Box>
				<SimpleGrid
					columns={{
						base: 2,
						lg: 5,
					}}
					spacing={{
						base: '6',
						md: '12',
						lg: '16',
					}}
					mt="12"
					alignItems="center"
					justifyItems="center"
					fontSize="2xl"
					opacity={0.6}
				>
					<Logos.Wakanda />
					<Logos.Wakanda />
					<Logos.Wakanda />
					<Logos.Wakanda />
					<Logos.Wakanda />

				</SimpleGrid>
			</Box>
		</Box>
	)
}