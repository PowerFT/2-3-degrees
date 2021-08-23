/**
 * External dependencies
 */
 import React from 'react';
 import { Button, Text, LinkBox, LinkOverlay, Flex } from '@chakra-ui/react'
 import {Link as GatsbyLink} from 'gatsby'
 /**
  * Internal dependencies
  */

const Default = () => {

	return (
		<Flex>
			<Text>
			</Text>
			<LinkBox>
        <Button colorScheme="blue" w="100%">
          <Text fontSize="md"><LinkOverlay as={GatsbyLink} to="/maker/sign-up">Sign-up Here!</LinkOverlay></Text>
        </Button>
      </LinkBox>
			<LinkBox>
        <Button colorScheme="blue" w="100%">
          <Text fontSize="md"><LinkOverlay as={GatsbyLink} to="/maker/login">Log In Here!</LinkOverlay></Text>
        </Button>
      </LinkBox>
		</Flex>
	)
}

export default Default
