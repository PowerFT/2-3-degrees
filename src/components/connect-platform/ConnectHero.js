import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

export const ConnectHero = ({user}) => {

	return (
		<Box as="section">
			<Box
				mx="auto"
				h="100%"
			>
				<Stack
					direction={{base: 'column',lg: 'row',}}
					spacing={{base: '3rem',lg: '2rem',}}
					align={{lg: 'center',}}
					justify="space-between"
					h="full"
				>
					<Box
						flex="1 1 50%"
						px={{base: '6',md: '8',}}
						py={{base: '6',md: '10',}}
					>
						<Heading
							as="h1"
							size="3xl"
							color="gray.800"
							mt="8"
							fontWeight="extrabold"
							letterSpacing="tight"
						>
							Connect Platform
						</Heading>
						<Text color="gray.800" mt="4" fontSize="lg" fontWeight="medium">
							The place to connect with opportunities
						</Text>
					</Box>
					<Box
						flex="1 1 50%"
						pos="relative"
						w="full"
						height="full"
						m={0}
					>
						<StaticImage
							src="../../images/testImage1.jpg"
						/>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}
