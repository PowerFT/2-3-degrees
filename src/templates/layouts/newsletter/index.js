import {
	Box,
	Button,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import React from 'react'
import { HiShieldCheck } from 'react-icons/hi'

export const Newsletter = ({ text }) => {
	return (
		<Box as="section" bg="dBlue.300" py="12">
			<Box
				textAlign="center"
				bg={mode('white', 'gray.800')}
				shadow="lg"
				maxW={{
					base: 'xl',
					md: '3xl',
				}}
				mx="auto"
				px={{
					base: '6',
					md: '8',
				}}
				py="12"
				rounded={{base: "3xl", md: "full"}}
			>
				<Box maxW="md" mx="auto">
					{/* <Text
            color={mode('green.600', 'green.400')}
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="wide"
          >
            6,000+ PEOPLE ALREADY JOINED ❤️️
          </Text> */}
					<Heading mt="4" size="3xl">
						{text}
					</Heading>
					<Box mt="6">
						<form
							onSubmit={(e) => {
								e.preventDefault() // your subscribe logic here
							}}
						>
							<Stack justify="center" align="center" spacing="6">
								<Input
									aria-label="Enter your email"
									placeholder="Enter your email to join"
									rounded="base"
								/>
								<Button
									type="submit"
									w="fit-content"
									// mx="auto"
									// mt="6"
									bg="dYellow.300"
									size="lg"
									textTransform="uppercase"
									fontSize="sm"
									fontWeight="bold"
									rounded="full"
								>
									Subscribe
								</Button>
							</Stack>
						</form>
						<Text color={mode('gray.600', 'gray.400')} fontSize="sm" mt="5">
							<Box
								aria-hidden
								as={HiShieldCheck}
								display="inline-block"
								marginEnd="2"
								fontSize="lg"
								color={mode('green.600', 'green.400')}
							/>
							We&apos;re only send you relevant content
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}