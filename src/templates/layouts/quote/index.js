import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { BgImage } from '../../../components/BgImage'

export const Quote = ({ quoteText, quoteAuthor, bgCol="dCream.300", bgPatternCol="null", textColour="gray.800"}) => {
  console.log(bgPatternCol)

	return (

		<Flex as="section" minH="75vh" justify="center" align="center" bg={bgCol} pos="relative"
		>
			<Box
				mx="auto"
				maxW="2xl"
				px={{ base: '6', lg: '8' }}
				py={{ base: '16', sm: '20' }}
				zIndex="5"
				color={textColour}
			>
				<Heading as="h2"  fontSize={{base:"2.75rem", sm:"4rem"}} lineHeight={{base:"3rem", sm:"4.25rem"}} fontWeight="extrabold" letterSpacing="tight" color="inherit"
					// data-sal="slide-up"
					// data-sal-delay="300"
					// data-sal-easing="ease"
					// data-sal-duration="500"
				>
					"{quoteText}"
				</Heading>
				<Text 
					mt="4" 
					fontSize="lg"
					color="inherit"
					data-sal="slide-up"
					data-sal-delay="500"
					data-sal-easing="ease"
					data-sal-duration="500"
				>
					- {quoteAuthor}
				</Text>
			</Box>
			
			{bgPatternCol && (
				<BgImage bgPatternCol={bgPatternCol} />
			)}

		</Flex>
	)
}