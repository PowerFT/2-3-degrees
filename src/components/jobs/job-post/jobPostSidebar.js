import React from 'react'
import { Text, Button, HStack, Icon, Stack, Spacer, VStack, Box } from "@chakra-ui/react"
import { HiOutlineClock, HiOutlineCurrencyPound, HiOutlineHand, HiOutlineLocationMarker } from "react-icons/hi"


export const JobSidebar = (props) => {

	const {salary, jobLocation, sector, jobSkills, jobType, ...rest} = props
	const formattedSalary = parseInt(salary).toLocaleString() 

	console.log('job sidebar', props)
	return (
		<>
			<Box p="4" fontSize="lg" w="full">
				<VStack spacing="2" align="flex-start">
					{
						jobSkills?.nodes?.map(skill => (
							<HStack>
								<Icon as={HiOutlineHand} w={8} h={8}/>
								<Text>{skill.name}</Text>
							</HStack>
						))
					}
				</VStack>
				<VStack spacing="2" align="flex-start" mt="6" w="full">
					<HStack>
						<Icon as={HiOutlineCurrencyPound} w={8} h={8}/>
						<Text fontWeight="500">{formattedSalary}</Text>
					</HStack>
					<HStack>
						<Icon as={HiOutlineLocationMarker} w={8} h={8}/>
						<Text fontWeight="500">{jobLocation}</Text>
					</HStack>
					<HStack>
						<Icon as={HiOutlineClock} w={8} h={8}/>
						<Text fontWeight="500">{jobType}</Text>
					</HStack>
				</VStack>
			</Box>

			<Spacer />

			<Stack direction="column" spacing={4} align="center"  alignItems="stretch" w="full" position="sticky" b="0">
				<Button bg="dYellow.300" color="gray.800" variant="outline" w="full">
					Company Website
				</Button>
				<Button bg="dYellow.300" color="gray.800" variant="solid">
					Apply
				</Button>
				{/* <Button bg="dYellow.300" color="dBlue.300" variant="solid">
					Save
				</Button> */}
			</Stack>
		</>
	)
}