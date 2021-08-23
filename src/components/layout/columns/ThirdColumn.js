import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'

export const ThirdColumn = ({ children }) => {
	return (
		<Flex
			// display={{
			// 	base: 'none',
			// 	lg: 'block',
			// }}
			
			width="96"
			direction="column"
			overflowY="auto"
			borderRightWidth="1px"
			p="6"
		>
			<Box h="full">
				{ children }
			</Box>
		</Flex>
	)
}
