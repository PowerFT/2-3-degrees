import React from 'react'
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import { HiSpeakerphone, HiUserCircle, HiSearchCircle } from 'react-icons/hi'


const Feature = (props) => {
  const { title, icon, featureLink, complete } = props
  return (
    <LinkBox >
      <Flex rounded="lg" direction="row" align="center" cursor={!complete ? "not-allowed" : "pointer"} bg={!complete ? "gray.300" : "dOrange.300"} p={{base:"5",sm:"10"}} _hover={{bg: "dOrange.200"}} h="100%">
        <Box color="gray.50" fontSize="3rem">
          {icon}
        </Box>
        <Stack mx="auto">
          <Heading as="h3" textAlign="center" color="gray.50" size="xl">
							<LinkOverlay as={Link} to={featureLink}>{title}</LinkOverlay>
          </Heading>
        </Stack>
      </Flex>
    </LinkBox>
  )
}

export const Features = ({complete, user}) => {

	return (
		<SimpleGrid
			flex="1"
			columns={{ base: 1, md: 2 }}
			spacing="3"
			py="12"
			px="6"
			w='100%'
		>
			{
				user === 'maker' ? (
					<>
						<Feature 
							complete={complete}
							featureLink="/maker/jobs/post" 
							title="Post an Opportunity" 
							icon={<HiSpeakerphone />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/connect/jobs"
							title="Connect Opportunity Board" 
							icon={<HiSearchCircle />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/maker/jobs"
							title="My Opportunities" 
							icon={<HiSearchCircle />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/connect/platform#connectContent"
							title="Exclusive Content" 
							icon={<HiUserCircle />} 
						/>
					</>
				) : (
					<>
						<Feature 
							complete={complete}
							featureLink="/connect/jobs"
							title="Connect Opportunity Board" 
							icon={<HiSearchCircle />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/connect/platform#connectContent" 
							title="Exclusive Content" 
							icon={<HiSpeakerphone />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/connect/platform#opportunityTags"
							title="Search Jobs by Skill" 
							icon={<HiSearchCircle />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/maker/account"
							title="Update Account" 
							icon={<HiUserCircle />} 
						/>
					</>
				)
			}  
		</SimpleGrid>
	)
}





