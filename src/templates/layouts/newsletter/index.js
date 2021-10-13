import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiShieldCheck } from 'react-icons/hi'
import addToMailchimp from 'gatsby-plugin-mailchimp'

export const Newsletter = ({ text, bgCol }) => {

	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState(null)
	const [email, setEmail] = useState('') 

  const handleSubmit = (e) => {
		e.preventDefault()

    addToMailchimp(email)
		
		.then((data) => {

      if (data.result == "error") {
        setError(data)
      } else {
        // trackCustomEvent({
        //   category: "Newsletter",
        //   action: "Click",
        //   label: `Newsletter Click`,
        // })
        setSubmitted(true)
      }
    })
  }

	return (
		<Box as="section" bg={bgCol} py="12" px="6">
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

				{submitted ? (
						<Box maxW="md" mx="auto">
							<Heading mb="3">Successfully subscribed!</Heading>
							<Text>Please check your email, to finish the signup</Text>
						</Box>
				) : (
					<Box maxW="md" mx="auto">
						<Heading mt="4" size="3xl">
							{text}
						</Heading>
						<Box mt="6">
							<form
								onSubmit={handleSubmit}
							>
								<Stack justify="center" align="center" spacing="6">
									{ 
										error &&
										<Alert status="warning">
											<AlertIcon />
											{error}
										</Alert>
									}
									<Input
										aria-label="Enter your email"
										placeholder="Enter your email to join"
										rounded="base"
										value={email} 
              			onChange={e=> setEmail(e.target.value)}
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
				)}
				
			</Box>
		</Box>
	)
}