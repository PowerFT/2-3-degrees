import { Box, Tab, Tabs, TabList, TabPanel, TabPanels, HStack, Text, Heading, Flex, Stack } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { MdPermPhoneMsg } from 'react-icons/md'

export const TabsBlock = ({ tabs }) => {


	// console.log(tabs)

	return (
		// <p>tabsssssss</p>
		<Box maxW="5xl">
			<Tabs isFitted variant="enclosed">

				<TabList mb="1em">
					{
						tabs.map((tab, i) => (
							<Tab key={i}>{tab.title}</Tab>
						))
					}
				</TabList>

				<TabPanels>
					{tabs.map((tab, i) => {

						// console.log(tab.image.localFile)
						const imageData = getImage(tab.image.localFile)
						// console.log(imageData)
						return (
							<TabPanel key={i}>
								<Flex align="center" justify="center" direction={{ base: 'column-reverse', md: 'row' }}>
									<Box flex="1" maxW="440px">
										<Heading
											size="2xl"
											fontWeight="extrabold"
											color='blue.600'
										>
											{tab.subTitle}
										</Heading>
										<Text
											fontSize="lg"
											fontWeight="medium"
											color='gray.600'
											mt="6"
										>
											{tab.text}
										</Text>

										<Stack mt={{ base: '8', md: '16' }} spacing="4" fontWeight="extrabold">
											{
												tab.list.map(item => (
													<HStack spacing="5" color='blue.600'>
														<Box fontSize="3xl" as={MdPermPhoneMsg} />
														<Text fontSize={{ base: 'lg', md: 'xl' }}>{item.text}</Text>
													</HStack>
												))
											}
										</Stack>
									</Box>

									<Box aria-hidden className="spacer" flexShrink={0} boxSize={{ base: '10', xl: '20' }} />

									<Box flex="1" maxW="560px" h={{ base: '400px', md: '460px' }}>
										<GatsbyImage
											image={imageData}
											alt={'tbc'}
											objectFit="cover"
											height="100%"
											width="100%"
										/>
									</Box>
								</Flex>

							</TabPanel>
						)
					})}
				</TabPanels>

			</Tabs>
		</Box>
	)
}
