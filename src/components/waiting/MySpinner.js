import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

export const MySpinner = () => {
	return (
		<Flex
        id="loadingBlock"
        w="100%"
        h="50vh"
        justify="center"
        align="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="dYellow.300"
          size="xl"
        />
      </Flex>
	)
}
