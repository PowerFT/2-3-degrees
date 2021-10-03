import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { ResetForm } from '../components/user/reset/ResetForm'

const Reset = () => {

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      overflow="hidden"
      minH="100vh"
      bg={mode('gray.50', 'inherit')}
    >
      <Flex align="center" overflowY="auto" flex="1 0 50%" py={{ base: '10', md: '16' }} px={{ base: '6', md: '10' }}>
        <Box maxW="sm" mx="auto">
          <Box textAlign="center" mb={{ base: '5', md: '8' }}>
            <Text as="h1" fontSize="3xl" fontWeight="extrabold" letterSpacing="tight">
              Want to reset your password?
            </Text>
          </Box>
          <ResetForm />
        </Box>
      </Flex>
			
			{/* <Flex
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
			</Flex> */}

      <Flex
        maxH="100vh"
        overflow="hidden"
        flex="1 0 50%"
        bg="dYellow.100"
        justify="center"
        align="center"
        direction="column"
        p={10}
      >
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Start
        </Heading>
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Making
        </Heading>
        <Heading
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Opportunites
        </Heading>
        <Badge
          mt="6"
          bg="dYellow.400"
          px="5"
          py="1"
          rounded="full"
          letterSpacing="wide"
          color="gray.50"
          fontSize="md"
        >
          Connect
        </Badge>
      </Flex>
    </Flex>
  )
}

export default Reset
