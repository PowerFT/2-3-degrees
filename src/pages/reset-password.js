import {
  Box,
  Flex,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React from 'react'
// import { UnderlineLink } from '../../UnderlineLink'
// import { useAuth } from '../../../../hooks'
// import { navigate } from 'gatsby'
import { ResetPasswordForm } from '../components/user/reset/ResetPasswordForm'
// import { useEffect } from 'react'
// import { UnderlineLink } from '../components/user/UnderlineLink'

const ResetPassword = () => {

  return (
    <Flex
      overflow="hidden"
      bg={mode('gray.50', 'inherit')}
			align="center"
			justify="center"
			py="32"
    >
			<Box maxW="sm" >
				<Box textAlign="center" mb={{ base: '5', md: '8' }}>
					<Text as="h1" fontSize="3xl" fontWeight="bold" letterSpacing="tight">
						Reset your password
					</Text>
				</Box>
				<ResetPasswordForm/>
			</Box>
    </Flex>
  )
}

export default ResetPassword