import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
// import { motion } from 'framer-motion';
// const MotionBox = motion(Box)

export const Content = ({children, ...rest}) => {
	return (
		<Box 
			className="site__content"
			// bg=".50"
			flex="1"
			w="100%"
			pb="6"
		>
			<Flex justify="center" width="100%" direction="column" p="6">
				{children}
			</Flex>
		</Box>
	)
}
