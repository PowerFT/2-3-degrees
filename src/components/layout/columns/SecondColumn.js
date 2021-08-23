import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'

export const SecondColumn = ({ children, ...rest }) => {
	return (
		<Flex
			// display={{
			// 	base: 'none',
			// 	lg: 'block',
			// }}
			
			// width="96"
			flexGrow="0"
			flexShrink="0"
			direction="column"
			overflowY="auto"
			borderRightWidth="1px"
			p="6"
			{...rest}
		>
			<Box h="full">
				{ children }
			</Box>
		</Flex>
	)
}
