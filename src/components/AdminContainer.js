import { Flex } from '@chakra-ui/layout'
import React from 'react'

export const AdminContainer = ({children, ...rest}) => {
	return (
		<Flex 
			className="admin__container"
			justify="center" 
			align="center" 
			p="10" 
			m="10"
			borderRadius="10" 
			bg="gray.100" 
			{...rest}
		>
			{children}
		</Flex>
	)
}