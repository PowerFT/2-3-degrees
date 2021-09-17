import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Flex } from '@chakra-ui/layout'
import { MySpinner } from '../waiting/MySpinner'
import { Link } from 'gatsby'
import { LinkBox, LinkOverlay } from '@chakra-ui/react'


const GET_META_DATA = gql`
	query MetaDataQuery {
		allJobType {
			nodes {
				name
				id
			}
		}
		skills {
			nodes {
				name
				id
			}
		}
	}
`

export const ConnectMetaTags = () => {

	const { loading, error, data } = useQuery(GET_META_DATA)
	if (error) return <p>{`Error: ${error}`}</p> //change
	if (loading || !data) return <MySpinner /> //change
	return (
		<Box mt="4" mx="auto">
			<Flex
				justify="center"
				align="center"
				wrap="wrap"
				mt="2"
			>
				{data?.allJobType?.nodes.map(node => (
					<LinkBox
						key={node.id}
						as="span"
						cursor="pointer"
						user-select="none"
						bg="dOrange.200"
						color="gray.700"
						textAlign="center"
						mr="1"
						mb="2"
						rounded="2xl"
						px={3}
						py={2}
						fontSize="xs"
						fontWeight="bold"
						// bg={active ? "red.700" : "gray.50"}
						_hover={{
							bg: 'gray.600',
						}}
					>
						<LinkOverlay as={Link} to={`/connect/jobs/?type=${node.name}`}>{node.name}</LinkOverlay>
					</LinkBox>
				))}
			</Flex>
			<Flex
				justify="flex-start"
				align="center"
				wrap="wrap"
				mt="2"
				justifyContent="center"
			>
				{data?.skills?.nodes?.map(node => (
					<LinkBox
						key={node.id}
						as="span"
						cursor="pointer"
						user-select="none"
						bg="dOrange.300"
						color="gray.700"
						textAlign="center"
						mr="1"
						mb="2"
						rounded="2xl"
						px={3}
						py={2}
						fontSize="xs"
						fontWeight="bold"
						// bg={active ? "red.700" : "gray.50"}
						_hover={{
							bg: 'gray.600',
						}}
					>
						<LinkOverlay as={Link} to={`/connect/jobs/?skill=${node.name}`}>{node.name}</LinkOverlay>
					</LinkBox>
				))}
			</Flex>
		</Box>
	)
}
