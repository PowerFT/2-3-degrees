import React from 'react'
import {
  Box,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import { HiSpeakerphone, HiLockOpen, HiUserCircle, HiSearchCircle } from 'react-icons/hi'


const Feature = (props) => {
  const { title, icon, featureLink, complete } = props
  return (
    <Link to={featureLink}>
      <Flex direction="column" align="center" bg="dOrange.300" rounded="xl" p="5" _hover={{bg: "dOrange.200"}} h="100%">
        <Box color="gray.50" fontSize="3rem">
          {icon}
        </Box>
        <Stack mt="4" mx="auto">
          <Text as="h3" textAlign="center" color="gray.800" fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </Stack>
      </Flex>
    </Link>
  )
}

export const Features = ({complete, user}) => {

	return (
		<SimpleGrid
			flex="1"
			columns={{ base: 1, md: 2 }}
			spacing={{ base: '2rem', md: '1.5rem' }}
			mt="4"
			maxW="xl"
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
							featureLink="/maker/account"
							title="Update Account" 
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
							featureLink="/connect/platform#connect-content" 
							title="Connected Content" 
							icon={<HiSpeakerphone />} 
						/>
						<Feature 
							complete={complete}
							featureLink="/connect/platform#opportunity-tags"
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





