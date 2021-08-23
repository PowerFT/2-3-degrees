import React from 'react'
import { Box, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { FaFileSignature } from 'react-icons/fa'

export const Feature = (props) => {

	const { title, children, icon } = props

	return (
		<Box>
			<Box color={mode('blue.500', 'blue.300')} fontSize="5xl">
				{icon}
			</Box>
			<Stack mt="6">
				<Text as="h3" color={mode('blue.500', 'blue.300')} fontSize="xl" fontWeight="extrabold">
					{title}
				</Text>
				<Text pr="6" lineHeight="tall">
					{children}
				</Text>
			</Stack>
		</Box>
	)
}

export const Pillars = ({ pillars }) => {

	return (
		<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '12', md: '8' }}>
			{pillars.map((pillar, i) => (
				<Feature key={i} title={pillar.title} icon={<FaFileSignature />}>
					{pillar.text}
				</Feature>
			))}
		</SimpleGrid>
	)
}
