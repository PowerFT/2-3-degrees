import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  Badge,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react'
import {FaRegEye} from 'react-icons/fa'
import {RiEditLine} from 'react-icons/ri'
import * as React from 'react'
import { HiCash, HiLocationMarker } from 'react-icons/hi'
import { Link } from 'gatsby'


export const MyJobCard = ({title, jobLocation, salary, jobType, sector, companyName, jobPostId, status, content, id}) => {

  const formattedSalary = parseInt(salary).toLocaleString()
	const pending = status !== "publish"
	const jobPostLink = `/connect-platform${jobPostId}`
  

  return (
    <Box
      id="jobCard"
      // maxW="3xl"
      // mx="auto"
      flex="1"
      bg='whitesmoke'
      // rounded={{
      //   md: 'xl',
      // }}
      borderTop="1px solid"
      padding="6"
      px={{
        base: '4',
        md: '6',
      }}
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
          size="lg"
          name={companyName}
          bg="pink.100"
          alignSelf="center"
          mr="8"
          ml="3"
          // src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />
        <Box
         ml="30px"
        >
          <HStack align="flex-start" justify="space-between" mb="1.5">
            <VStack align="flex-start" >
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
                <Text as="h2" fontWeight="bold" fontSize="xl">
                  {companyName}
                </Text>
                <Text as="span" color={useColorModeValue('gray.500', 'gray.300')} lineHeight="1">
                  {sector}
                </Text>
              </HStack>
              <Text fontSize="xl">{title}</Text>
            </VStack>
            
            {/* <Divider orientation="vertical" /> */}
 
            <ButtonGroup isAttached variant="outline" flexDirection="column" borderLeft="1px">
              <Button
                as={Link}
                to={`/maker/jobs/edit?job=${id}`}
                // width="full"
                colorScheme="blue"
                size="sm"
                mb="-px"
                border="none"
              >
                <Icon as={RiEditLine} h="25px" w="25px" />
              </Button>
              <Button
                // width="full"
                colorScheme="blue"
                border="none"
                mt="2"
                size="sm"
              >
                <Icon h="25px" w="25px" as={FaRegEye} />
              </Button>
            </ButtonGroup>
          </HStack>

          {/* <Divider orientation="horizontal" /> */}

          <Wrap shouldWrapChildren py="1.5" spacing="2" align="center">
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
              <Icon as={HiLocationMarker} color="gray.400" />
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
            <Badge
              display="flex"
              alignItems="center" 
              borderRadius="full" 
              px="2" 
              cursor={pending ? "help" : "default"}
              colorScheme={pending ? "orange" : "green"}>
              { pending ? (
                <>
                  Pending
                </>
              ) : (
                "Approved"
              )}
            </Badge>
          </Wrap>

          {/* <Divider orientation="horizontal" /> */}

          {/* <Text mt="1.5" fontSize="sm" noOfLines={2}>
            {content}
          </Text> */}
        </Box>
      </Stack>
    </Box>
  )
}
