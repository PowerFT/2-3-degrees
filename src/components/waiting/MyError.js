import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import React from 'react'
import {Link} from 'gatsby'

export const MyError = (error) => {
	return (
		<Flex
        id="loadingBlock"
        w="100%"
        h="100vh"
        justify="center"
        align="center"
      >
        <p>{error}</p>
        <Button as={Link} to='/' colorScheme="blue">Return to Homepage</Button>
      </Flex>
	)
}
