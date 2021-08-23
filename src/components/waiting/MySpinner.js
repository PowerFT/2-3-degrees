import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

export const MySpinner = () => {
	return (
		<Flex
        id="loadingBlock"
        w="100%"
        h="100vh"
        justify="center"
        align="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
	)
}
