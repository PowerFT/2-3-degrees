import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'

export const MainColumn = ({ children }) => {
	return (
		<Flex flexGrow="3" flexShrink="1" p="6">
			<Box h="full" w="full">
				{children}
			</Box>
		</Flex>
	)
}
