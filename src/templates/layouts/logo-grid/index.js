import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'
import * as React from 'react'

export const LogoGrid = () => {
	return (
		<Box bg="dBlue.300" color="white" as="section" pt="16" pb="24">
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
					<Heading size="3xl" mb="4" color="white">
						Get Connected
					</Heading>
					{/* <Text maxW="2xl" mx="auto">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua elit consectetur adipiscing.
					</Text> */}
				</Box>
				<SimpleGrid
					columns={{
						base: 2,
						lg: 3,
					}}
					spacing={{
						base: '10',
						md: '12',
						lg: '16',
					}}
					mt="12"
					alignItems="center"
					justifyItems="center"
					opacity={0.6}
				>
					<StaticImage height={80} src="../../../images/client-logos/4.svg"/>
					<StaticImage height={80} src="../../../images/client-logos/BNPARIB.svg"/>
					<StaticImage height={80} src="../../../images/client-logos/Coke.svg"/>
					<StaticImage height={80} src="../../../images/client-logos/Converse.svg"/>
					<StaticImage height={80} src="../../../images/client-logos/Google.svg"/>
					{/* <StaticImage height={80} src="../../../images/client-logos/LANDSEC.svg"/> */}
					<StaticImage height={80} src="../../../images/client-logos/microsoft.svg"/>

				</SimpleGrid>
			</Box>
		</Box>
	)
}