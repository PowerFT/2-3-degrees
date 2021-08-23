import { Heading, VStack } from '@chakra-ui/react'
import * as React from 'react'

export const AdminBlob = (props) => {
	const { title, children, ...flexProps } = props
	return (
		<VStack
			bg="white"
			rounded="xl"
			borderWidth="1px"
			borderColor="gray.800"
			w={["xs", "sm"]}
			spacing="3"
			p="6"
			align="flex-start"
			{...flexProps}
		>
			{title && (
				<Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0} alignSelf="center">
					{title}
				</Heading>
			)}
			{children}
		</VStack>
	)
}
