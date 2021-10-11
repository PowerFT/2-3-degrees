import { Stack } from '@chakra-ui/react'
import React from 'react'

export const JobsCardContainer = ({children, ...rest}) => {
	return (
		<Stack spacing="4" className="jobsList" w="full" align="center" {...rest}>
			{children}
		</Stack>
	)
}
