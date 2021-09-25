import {
  Avatar,
  Box,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import {Link as GatsbyLink} from 'gatsby'
import { HiCash, HiClock, HiLocationMarker } from 'react-icons/hi'

export const JobCard = ({title, jobLocation, salary, jobType, sector, companyName, jobPostId, status, content, id, uri}) => {

  const formattedSalary = parseInt(salary).toLocaleString()

  return (
    <LinkBox w="100%">
      <Box 
        borderRadius="md" 
        position="relative" 
        overflow="hidden" 
        bg="white" 
        px={{base: "4", sm: "6"}} 
        py={{base: "4", sm: "6"}} 
        maxW="xl"
        minW={{base:"xs",md:"lg"}}
        _hover={{shadow:"base", transform:"translateY(-5px) scale(1.01)" }}
        transition="all .4s"
      >

        <Stack
          id="jobCardContainer"
          // direction={{
          //   base: 'column',
          //   md: 'row',
          // }}
          align="flex-start"
          direction="row"
          // my={1}
        >
          <Avatar
            size="md"
            name={companyName}
            // alignSelf="center"
            mr={{base:"3",  sm:"6"}}
            ml="0"
            // src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <Box>
          <HStack align="flex-start" justify="space-between" mb="1.5">
            <VStack align="flex-start" >
              <Text fontSize={{base:"2xl",  sm:"3xl"}} as="h2" fontWeight="400">
                <LinkOverlay as={GatsbyLink} to={`/connect/jobs/${id}`}>{title}</LinkOverlay>
              </Text>
              <HStack
                spacing={{
                  base: '1',
                  md: '4',
                }}
                
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                fontSize={{
                  base: 'md',
                  md: 'lg',
                }}
              >
                <Text as="h3" fontSize={{base:"xl",  sm:"2xl"}} color="gray.600">
                  {companyName}
                </Text>
                <Text as="h3" fontSize={{base:"xl",  sm:"2xl"}} color="gray.600" fontWeight="light">
                  {sector}
                </Text>
              </HStack>
            </VStack>
          </HStack>

            <Stack pt="1.5" direction={{base:"column",  sm:"row"}} spacing={{base:"2", sm:"3", md:"5"}} wrap="wrap" align="flex-start" justify="flex-start">
              <HStack>
                <Icon as={HiCash} fontSize="xl" color="gray.400" />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  <b>£{formattedSalary}</b> /yr
                </Text>
              </HStack>
              <HStack spacing="1">
                <Icon as={HiClock} color="gray.400" />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  {jobType}
                </Text>
              </HStack>
              <HStack spacing="1">
                <Icon as={HiLocationMarker} color="gray.400" />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  {jobLocation}
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Stack>

        <Box  
          position="absolute"
          bottom="0px"
          top="0px"
          right="0px"
          w="4px"
          bg="dYellow.200"
        />

      </Box>
    </LinkBox>
  )
}
