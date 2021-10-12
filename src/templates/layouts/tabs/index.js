import { Button, Box, Tabs, TabList, TabPanel, TabPanels, HStack, Text, Heading, Flex, Stack, chakra, useTab, useStyles, Spacer } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import parse from "html-react-parser"
import { BsLightningFill } from 'react-icons/bs'
import { Link } from 'gatsby'

export const TabSection = ( props ) => {
	console.log(props)

	const {tabs, title, tabsCol, tabHeaderBgCol, textColour} = props

	// 1. Reuse the styles for the Tab
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" })

  const CustomTab = React.forwardRef((props, ref) => {
    // 2. Reuse the `useTab` hook
    const tabProps = useTab({...props, ref})
    // const isSelected = !!tabProps["aria-selected"]

    // 3. Hook into the Tabs `size`, `variant`, props
    const styles = useStyles()

    return (
      <StyledTab __css={styles.tab} {...tabProps} p="5" cursor="pointer" shadow="none" bg="gray.200" boxShadow="-2px -1px 2px 0px #0000000a" _selected={{ color: "white", bg: tabsCol }}>
        {tabProps.children}
      </StyledTab>
    )
  })

	return (
		// <p>tabsssssss</p>
		<Box>
		

			<Tabs borderTop="1px solid #f67011" isFitted>

				<TabList flexWrap="wrap">
					{title && (
						<Heading
							className="tabblock__header--title"
							size="4xl"
							p="8"
							flex="1 1 50%"
						> 
							{title}
						</Heading>
					)}

					<Flex flex="1 1 50%" justifyContent="flex-start">
						{
							tabs?.map((tab, i) => (
								<CustomTab key={i}><Text fontSize="xl" fontWeight="600" minW="50px">{tab.title}</Text></CustomTab>
							))
						}
					</Flex>
					

				</TabList>

				<TabPanels>
					{tabs?.map((tab, i) => {

						// console.log(tab.image.localFile)
						const imageData = getImage(tab.image?.localFile)
						// console.log(imageData)
						const buttonTitle = tab?.button?.title
						const buttonLink = tab?.button?.url
						return (
							<TabPanel p={0} key={i}>
								<Box className="tabblock" bg="dYellow.50">
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
										<Flex direction="column" flex="1 1 50%" p="8" bg={tabHeaderBgCol} color="gray.800" order={i%2 === 0 ? 2 : 1}>
											{tab?.title && (
												<Heading
													className="tabblock__header--title"
													size="4xl"
													color={textColour}
												> 
													{parse(tab?.title)}
												</Heading>
											)}
											{tab?.subTitle && (
												<Text
													className="tabblock__header--subtitle"
													fontSize={{ base: 'xl', lg: '2xl' }}
													mt="4"
													maxW="2xl"
													mx={{ base: 'auto', lg: 'unset' }}
												>
												{parse(tab?.subTitle)}
												</Text>
											)}
											<Spacer />
											{tab?.button && (
												<Button 
													as={Link} 
													textDecoration="none" 
													fontWeight="500" 
													direction="down" 
													to={buttonLink} 
													mt="8" 
													size="md"
													rounded="full" 
													bg="dYellow.300" 
													color="gray.800"
													w="fit-content"
													alignSelf={{base:"center", md:"flex-start"}}
												>
													{buttonTitle}
												</Button>
											)}
										</Flex>
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
										{tab.text && (
											<Box className="tabblock__body--content wp-content">
												{parse(tab?.text)}
											</Box>
										)}
										{tab?.list && (
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
										)}
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
