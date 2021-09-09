import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'

export const Quote = ({ quoteText, quoteAuthor }) => (
	<Flex as="section" minH="75vh" justify="center" align="center" bg="dOrange.300"
	>
		<Box
			mx="auto"
			maxW="2xl"
			px={{ base: '6', lg: '8' }}
			py={{ base: '16', sm: '20' }}
		>
			<Heading as="h2"  size="3xl" fontWeight="extrabold" letterSpacing="tight" color="gray.50"
				data-sal="slide-up"
  			data-sal-delay="300"
  			data-sal-easing="ease"
				data-sal-duration="500"
			>
				"{quoteText}"
			</Heading>
			<Text mt="4" fontSize="lg" color="gray.50"
				data-sal="slide-up"
				data-sal-delay="500"
				data-sal-easing="ease"
				data-sal-duration="500"
			>
				- {quoteAuthor}
			</Text>
		</Box>
	</Flex>
)