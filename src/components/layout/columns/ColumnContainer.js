import { Flex } from '@chakra-ui/layout'
import React from 'react'

export const ColumnContainter = ({ children, ...rest }) => {
	return (
		<Flex
			// display={{
			// 	base: 'none',
			// 	lg: 'block',
			// }}
			// flexWrap="wrap"
			overflowY="auto"
			flex="1"
			{...rest}
		>

				{ children }
		</Flex>
	)
}
