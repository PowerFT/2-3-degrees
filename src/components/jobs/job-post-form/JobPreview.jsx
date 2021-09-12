import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Avatar,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiCash, HiClock, HiLocationMarker } from 'react-icons/hi'


export const JobPreviewCard = ({ title, jobLocation, salary, jobType, sector, companyName, salStructure}) => {
  //console.log(salStructure)
  const formattedSalary = parseInt(salary).toLocaleString()

  return (
    <Box position="relative" >
      <Box
       overflow="hidden"
        id="previewCard"
        position="relative"
        maxW="xl"
        w="lg"
        mx="auto"
        bg="white"
        rounded={{
          md: 'md',
        }}
        padding="6"
        // shadow={{
        //   md: 'base',
        // }}
        px={{
          base: '6',
          md: '4',
        }}
      >
        <Stack
        direction="row"
        align="flex-start"
          // direction={{
          //   base: 'column',
          //   md: 'row',
          // }}
          spacing={{
            base: '3',
            md: '5',
          }}
        // align={{
        //   base: 'space-between',
        //   md: 'flex-start',
        // }}
        // justify={{
        //   base: 'flex-start',
        //   md: 'space-between',
        // }}
        >
          <Avatar
            size="lg"
            name={companyName}
            // alignSelf="center"
            mr="6"
            ml="0"
            // src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <Box ml="30px">
            <HStack align="flex-start" justify="space-between" mb="1.5">
              <VStack align="flex-start">
                <Text fontSize="3xl" as="h2" fontWeight="400">
                  {title}
                </Text>
                <HStack
                  spacing={{
                    base: '1',
                    md: '4',
                  }}
                  direction="row"
                  // direction={{
                  //   base: 'column',
                  //   md: 'row',
                  // }}
                  fontSize={{
                    base: 'md',
                    md: 'lg',
                  }}
                >
                  <Text as="h3" fontSize="2xl" color="gray.600">
                    {companyName}
                  </Text>
                  <Text as="h3" fontSize="2xl" color="gray.600" fontWeight="light">
                    {sector}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack pt="1.5" spacing="5" align="center">
              <HStack>
                <Icon as={HiCash} fontSize="xl" color="gray.400" />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  <b>{salary && (`£${formattedSalary}`)}</b> / {salStructure.toLocaleLowerCase()}
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
              {/* <Badge
                display="flex"
                alignItems="center" 
                borderRadius="full" 
                px="2" 
                cursor={pending ? "help" : "default"}
                colorScheme={pending ? "orange" : "green"}>
                { pending ? (
                  <>
                    Pending <QuestionOutlineIcon ml="1"/>
                  </>
                ) : (
                  "Approved"
                )}
              </Badge> */}
            </HStack>
            {/* <Wrap shouldWrapChildren my="2" spacing="2">
              {
                salary && (
                  <HStack>
                    <Icon as={HiCash} fontSize="xl" color="gray.400" />
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                    // color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      <b>£{formattedSalary}</b> /yr
                    </Text>
                  </HStack>
                )
              }
              {
                jobType && (
                  <HStack spacing="1">
                    <Icon as={HiLocationMarker} color="gray.400" />
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                    // color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      {jobType}
                    </Text>
                  </HStack>
                )
              }
              {
                jobLocation && (
                  <HStack spacing="1">
                    <Icon as={HiLocationMarker} color="gray.400" />
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                    // color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      {jobLocation}
                    </Text>
                  </HStack>
                )
              }

            </Wrap> */}
          </Box>

          {/* <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY5fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            name="Melinda Paul"
            justifySelf="flex-end"
          /> */}
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

      </Box>
      
  )
}
