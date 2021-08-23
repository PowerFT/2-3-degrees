import { Box, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'

export const Quote = ({ quoteText, quoteAuthor }) => (
	<Box as="section">
		<Box
			maxW="2xl"
			mx="auto"
			px={{ base: '6', lg: '8' }}
			py={{ base: '16', sm: '20' }}
		>
			<Heading as="h2" size="3xl" fontWeight="extrabold" letterSpacing="tight">
				{quoteText}
			</Heading>
			<Text mt="4" fontSize="lg">
				- {quoteAuthor}
			</Text>
		</Box>
	</Box>
)