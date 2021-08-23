import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout'
import { MySpinner } from '../../../waiting/MySpinner'
import { Select } from '@chakra-ui/select'

const GET_META_DATA = gql`
	query MetaDataQuery {
		allJobLocation {
			nodes {
				name
				id
				parentId
				children {
					nodes {
						name
					}
				}
			}
		}
		allSector {
			nodes {
				name
				id
			}
		}
		allJobType {
			nodes {
				name
				id
			}
		}
	}
`

export const JobsFilterVariables = ({ setError, setLoading, locations, setLocations, sectors, setSectors, jobTypes, setJobTypes }) => {

	const { loading, error, data } = useQuery(GET_META_DATA)
	// console.log(data)
	// useEffect(() => {
	// 	setLoading(loading)
	// 	setError(error)
	// }, [loading, error, data])]
	var active = false


	if (error) return <p>{`Error: ${error}`}</p> //change
	if (loading || !data) return <MySpinner /> //change


	return (
		<VStack spacing="4">

			<Box w="100%">
				<Heading size="sm">Location</Heading>
				<Select
					placeholder="Select Location"
					mt="2"
					onChange={(e) => {
						console.log(locations)
						locations.includes(e.target.value)
							? setLocations(locations.filter(location => location !== e.target.value))
							: setLocations([e.target.value, ...locations])
					}}
				>
					{
						data.allJobLocation.nodes.map((node) => (
							<option
								key={node.id}
								value={node.name}
							>
								{node.name}
							</option>
						))
					}
				</Select>
			</Box>


			{/* <Box>
				{data.allJobLocation.nodes.map((node) => {

					{return !node.parentId && (
						<>
							<Checkbox
								onChange={(e) => {
									locations.includes(node.name)
										? setLocations(locations.filter(location => location !== node.name))
										: setLocations([node.name, ...locations])
								}}
							>
								{node.name}
							</Checkbox>
							{node.children && (
								<Stack pl={6} mt={1} spacing={1}>
									{node.children.nodes.map((childNode, i) => {
										return (
											<Checkbox
												onChange={() => {
													locations.includes(node.name)
														? setLocations(locations.filter(location => location !== node.name))
														: setLocations([node.name, ...locations])
												}}
											>
												{childNode.name}
											</Checkbox>
										)
									})}
								</Stack>
							)}
							
						</>
					)}
				
				})}
			</Box> */}

			<Box>
				<Heading size="sm">Sector</Heading>
				<Flex
					justify="flex-start"
					align="center"
					wrap="wrap"
					mt="2"
				>
					{data.allSector.nodes.map((node) => (
						<Box
							as="span"
							cursor="pointer"
							user-select="none"
							color="gray.100"
							textAlign="center"
							rounded="2xl"
							px={3}
							py={2}
							mr="1"
							mb="2"
							fontSize="xs"
							fontWeight="bold"
							bg={active ? "red.700" : "gray.500"}
							_hover={{
								bg: 'gray.600',
							}}
							_active={{
								bg: 'red.700',
							}}
							onClick={() => {
								active = !active
								console.log(active)
							}}
							onChange={() => {
								sectors.includes(node.name)
									? setSectors(sectors.filter(sector => sector !== node.name))
									: setSectors([node.name, ...sectors])
							}}
						>
							{node.name}
						</Box>
					))}
				</Flex>
			</Box>

			{/* <Box>
				{data.allSector.nodes.map((node) => (
					<Checkbox
						onChange={() => {
							sectors.includes(node.name)
								? setSectors(sectors.filter(sector => sector !== node.name))
								: setSectors([node.name, ...sectors])
						}}
					>
						{node.name}
					</Checkbox>
				))}
			</Box> */}

			<Box>
				<Heading size="sm">Contract Type</Heading>
				<Flex
					justify="flex-start"
					align="center"
					wrap="wrap"
					mt="2"
				>
					{data.allJobType.nodes.map((node) => (
						<Box
							as="span"
							cursor="pointer"
							user-select="none"
							bgColor="gray.700"
							color="gray.100"
							textAlign="center"
							mr="1"
							mb="2"
							rounded="2xl"
							px={3}
							py={2}
							fontSize="xs"
							fontWeight="bold"
							bg={active ? "red.700" : "gray.500"}
							_hover={{
								bg: 'gray.600',
							}}
							_active={{
								bg: 'red.700',
							}}
							onClick={() => {
								active = !active
								console.log(active)
							}}
							onChange={() => {
								jobTypes.includes(node.name)
									? setJobTypes(jobTypes.filter(jobType => jobType !== node.name))
									: setJobTypes([node.name, ...jobTypes])
							}}
						>
							{node.name}
						</Box>
					))}
				</Flex>
			</Box>

			{/* <Box>
				{data.allJobType.nodes.map((node) => (
					<Checkbox
						onChange={() => {
							jobTypes.includes(node.name)
								? setJobTypes(jobTypes.filter(jobType => jobType !== node.name))
								: setJobTypes([node.name, ...jobTypes])
						}}
					>
						{node.name}
					</Checkbox>
				))}
			</Box> */}
		</VStack>
	)
}