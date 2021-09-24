import { Box, Tabs, TabList, TabPanel, TabPanels, HStack, Text, Heading, Flex, Stack, chakra, useTab, useStyles } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { MdPermPhoneMsg } from 'react-icons/md'
import parse from "html-react-parser"
import { BsLightningFill } from 'react-icons/bs'

export const TabSection = ( props ) => {
	console.log(props)

	const {tabs, title} = props

	// 1. Reuse the styles for the Tab
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" })

  const CustomTab = React.forwardRef((props, ref) => {
    // 2. Reuse the `useTab` hook
    const tabProps = useTab({...props, ref})
    // const isSelected = !!tabProps["aria-selected"]

    // 3. Hook into the Tabs `size`, `variant`, props
    const styles = useStyles()

    return (
      <StyledTab __css={styles.tab} {...tabProps} p="10" cursor="pointer" shadow="none" _selected={{ color: "white", bg: "dOrange.300" }}>
        {tabProps.children}
      </StyledTab>
    )
  })

	return (
		// <p>tabsssssss</p>
		<Box>
			{title && (
				<Heading
					className="tabblock__header--title"
					size="4xl"
					p="8"
				> 
					{title}
				</Heading>
			)}

			<Tabs borderTop="1px solid #f67011" isFitted>

				<TabList>
					{
						tabs?.map((tab, i) => (
							<CustomTab key={i}><Text fontSize="xl" fontWeight="600">{tab.title}</Text></CustomTab>
						))
					}
				</TabList>

				<TabPanels>
					{tabs?.map((tab, i) => {

						// console.log(tab.image.localFile)
						const imageData = getImage(tab.image?.localFile)
						// console.log(imageData)
						return (
							<TabPanel p={0} key={i}>
								<Box className="tabblock" >
									<Flex 
										className="tabblock__header" 
										textAlign={{ base: 'center', md: 'start', lg: 'start' }} 
										direction={[
											"column", "column", "row"
										]}
										height= {{
											md: "300px",
											lg: "400px",
										}}
										justify="center"
									>
										<Box flex="1 1 50%" p="8" bg="dBlue.300" color="gray.800" order={i%2 === 0 ? 2 : 1}>
											<Heading
												className="tabblock__header--title"
												size="4xl"
											> 
												{parse(tab?.title)}
											</Heading>
											{/* <Text
												className="tabblock__header--subtitle"
												fontSize={{ base: 'xl', lg: '2xl' }}
												mt="4"
												maxW="2xl"
												mx={{ base: 'auto', lg: 'unset' }}
											>
												{parse(tab.subTitle)}
											</Text> */}
										</Box>
										{tab?.image && (
											<Box position="relative" w="full" h="full" flex="1 1 50%" order={i%2 === 0 ? 1 : 2}>
												<GatsbyImage
													className="tab-block__image--img"
													image={imageData}
													alt={tab?.image?.altText}
													objectFit="cover"
													// loading="eager"
												/>
											</Box>
										)}
									</Flex>
									<Box
										className="tab-block__body"
										bg="gray.50"
										p={[
											"1.5rem",
											"1.5rem",
											"3rem"
										]}
										maxW="2xl"
										mx="auto"
									>
										<Box className="tabblock__body--content wp-content" >
											{parse(tab?.text)}
										</Box>
										<Stack mt={{ base: '8', md: '8' }} spacing="4">
											{
												tab?.list?.map((item, i) => (
													<HStack key={i} spacing="5" color='blue.600' color="gray.800">
														<Box fontSize="3xl" as={BsLightningFill} color="dBlue.300"/>
														<Text fontSize={{ base: 'md', md: 'lg' }}>{item.text}</Text>
													</HStack>
												))
											}
										</Stack>
									</Box>
								</Box>

							</TabPanel>
						)
					})}
				</TabPanels>

			</Tabs>
		</Box>
	)
}
// {/* <Flex align="center" justify="center" direction={{ base: 'column-reverse', md: 'row' }}>
// 									<Box flex="1" maxW="440px">
// 										<Heading
// 											size="2xl"
// 											fontWeight="extrabold"
// 											color='blue.600'
// 										>
// 											{tab?.subTitle}
// 										</Heading>
// 										<Text
// 											fontSize="lg"
// 											fontWeight="medium"
// 											color='gray.600'
// 											mt="6"
// 										>
// 											{tab?.text}
// 										</Text>

// 										<Stack mt={{ base: '8', md: '16' }} spacing="4" fontWeight="extrabold">
// 											{
// 												tab?.list?.map(item => (
// 													<HStack spacing="5" color='blue.600'>
// 														<Box fontSize="3xl" as={MdPermPhoneMsg} />
// 														<Text fontSize={{ base: 'lg', md: 'xl' }}>{item.text}</Text>
// 													</HStack>
// 												))
// 											}
// 										</Stack>
// 									</Box>

// 									<Box aria-hidden className="spacer" flexShrink={0} boxSize={{ base: '10', xl: '20' }} />

// 									<Box flex="1" maxW="560px" h={{ base: '400px', md: '460px' }}>
// 										<GatsbyImage
// 											image={imageData}
// 											alt={'tbc'}
// 											objectFit="cover"
// 											height="100%"
// 											width="100%"
// 										/>
// 									</Box>
// 								</Flex> */}
