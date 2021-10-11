import { Button } from '@chakra-ui/button'
import React from 'react'
import {Link} from 'gatsby'
import { Alert, AlertIcon, VStack } from '@chakra-ui/react'

export const MyError = ({error, homeButton}) => {
	return (
		<VStack>
      <Alert status="warning"> <AlertIcon/><p>{error}</p></Alert>
      { homeButton && (
        <Button as={Link} to='/' colorScheme="blue">Return to Homepage</Button>
        )
      }
    </VStack>
      
	)
}
 