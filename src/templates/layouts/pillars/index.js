import React from 'react'
import { Box, Collapse, Heading, Flex, SimpleGrid, Text, useDisclosure, VStack, Icon, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, AspectRatio } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { BgImage } from '../../../components/BgImage'

export const Feature = ({ img, linkUrl, title, children, icon, videoOrImage, videoLink, i, bgCol, bgPatternCol, ...rest }) => {

	const imgData = getImage(img?.localFile)

	// const [isShown, setIsShown] = useState(false);
	// console.log(title, "....entered")

	const { isOpen, onOpen, onClose } = useDisclosure()

	//console.log(children)

	return (
		<Box alignItems="center" {...rest}>
			
			{
				videoOrImage === "image" ? (
					<Flex
						position="relative"
						align="center"
						justify="center"
					>
						<GatsbyImage
							image={imgData}
							alt={img?.altText}
							objectFit="cover"
						/>
					</Flex>
				) : (
					<Flex
					position="relative"
					align="center"
					justify="center"
					_hover={{color:"dYellow.300"}}
					color="gray.50"
					onClick={onOpen}
					cursor="pointer"
					>
						<Icon 
							as={FaPlay}  
							position="absolute" 
							mx="auto" 
							my="auto" 
							zIndex="10" 
							color="inherit" 
							w="4rem" 
							h="4rem"
							shadow="xl yellow"
							transition="transform .25s ease-in-out"
							_hover={{transform:"translateY(-5px)"}}
						/>
						<Modal isOpen={isOpen} onClose={onClose} size="3xl" padding='12'>
							<ModalOverlay />
							<ModalContent maxW="3xl" p={{base:"2"}} bg="transparent">
								<ModalCloseButton color="gray.50"/>
								<ModalBody bg="black" px={{base:"2",sm:"12"}} py="12">
									<AspectRatio maxW="560px" ratio={1.25} mx="auto">
										<iframe
											title={`Embassador ${i}`}
											src={`${videoLink}?autoplay=1`}
											allowFullScreen
										/>
									</AspectRatio>
								</ModalBody>
							</ModalContent>
						</Modal>

						<GatsbyImage
							image={imgData}
							alt={img?.altText}
							objectFit="cover"
						/>
					</Flex>
				)
			}

			<Box w="100%" position="relative">
				<VStack 
					align="center" 
					justify="center" 
					bg="gray.50" 
					// insetX="0"
					// insetY="0" 
					zIndex={1}
					transition="all 2s"
					w="100%"
					textAlign="center"
					display={{base: "flex", sm:"none"}}
				>
					<Text color="gray.800" fontSize={["2xl", "2xl", "xl"]} fontWeight="bold">
						{title}
					</Text>
					{children && (
						<Box textAlign="center" mt="0">
							<Text p={2} bg="dYellow.300" color="gray.800">
								{children}
							</Text>
						</Box>
					)}
				</VStack>

				<VStack 
					align="center" 
					justify="center" 
					bg="gray.50" 
					zIndex="10"
					onMouseEnter={onOpen}
					onMouseLeave={onClose}
					position="absolute"
					// insetX="0"
					// insetY="0" 
					bottom="0"
					transition="all 2s"
					w="100%"
					textAlign="center"
					display={{base: "none", sm:"flex"}}
				>
					<Text color="gray.800" fontSize={["2xl", "2xl", "xl"]} fontWeight="bold">
						{title}
					</Text>
					{children && videoOrImage === "image" && (
						<Collapse in={isOpen} animateOpacity textAlign="center" mt="0">
							<Text p={2} bg="dBlue.400" color="gray.800">
								{children}
							</Text>
						</Collapse>
					)}
				</VStack>

			</Box>
		</Box>
	)
}

export const Pillars = ({ title, pillars, bgCol, bgPatternCol, textColour }) => {
	//console.log(pillars)
	
	return (

		<Flex as="section" align="center" justify="center" p={{ base: '4', md: '8' }}  direction="column" className="pillars" bg={bgCol} pos="relative" minH="75vh">
			
			<Heading textAlign="center" color={textColour} size="4xl" mt={{ base: '8', sm: '10' }} zIndex="10">{title}</Heading>
			<SimpleGrid 
				columns={{ md: 1, lg: 3 }} 
				spacing={{ base: '8', md: '12', lg: '8' }} 
				// px={{ base: '6', lg: '8' }} 
				mt={{ base: '8', sm: '10' }}
				mb={{ base: '16', sm: '20' }}
				w="100%"
				justifyItems="center"
				zIndex="10"
			>
				{pillars?.map((pillar, i) => (
					<Feature 
						key={i} 
						title={pillar.title}
						img={pillar.image}
						linkUrl={pillar.link?.url}
						maxW={{sm:"md",md:"lg"}}
						videoOrImage={pillar.videoimage}
						i={i}
						videoLink={pillar.video}
						// data-sal="slide-up"
						// data-sal-delay={400*i}
						// data-sal-easing="ease"
						// data-sal-duration="600"
					>
						{pillar.text}
					</Feature>
				))}
			</SimpleGrid>
			{bgPatternCol && (
				<BgImage bgPatternCol={bgPatternCol} />
			)}
		</Flex>
		
	)
}
