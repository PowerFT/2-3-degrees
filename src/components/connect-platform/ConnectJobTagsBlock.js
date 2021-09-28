import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { ConnectMetaTags } from './ConnectMetaTags'

export const ConnectJobsTagsBlock = () => {

  return (
			<Box as="section" alignSelf="stretch" bg="dYellow.100" color="dBlue.500" py="7.5rem" id="opportunityTags">
				<Box
					maxW={{
						base: 'xl',
						md: '3xl',
					}}
					mx="auto"
					px={{
						base: '6',
						md: '8',
					}}
				>
					<Box textAlign="center">
						<Heading
							as="h1"
							size="3xl"
							fontWeight="extrabold"
							maxW="48rem"
							mx="auto"
							lineHeight="1.2"
							letterSpacing="tight"
						>
							Find opportunities across all levels and experiences
						</Heading>
						<Text fontSize="xl" mt="4" maxW="lg" mx="auto">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore
						</Text>
					</Box>

					<ConnectMetaTags />
				</Box>
			</Box>
  )
}