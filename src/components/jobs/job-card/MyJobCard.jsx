import {
  Avatar,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import {AiOutlinePlus} from 'react-icons/ai'
import * as React from 'react'
import { HiCash, HiClock, HiLocationMarker, HiOutlineEye, HiOutlinePencil } from 'react-icons/hi'
import { Link } from 'gatsby'


export const MyJobCard = ({title, jobLocation, salary, jobType, sector, companyName, jobPostId, status, content, id}) => {

  const formattedSalary = parseInt(salary).toLocaleString()
	// const pending = status !== "publish"
	// const jobPostLink = `/connect${jobPostId}`
  

  return (
    <Box position="relative" maxW="2xl" overflow="hidden" borderRadius="md">
      <Box position="relative" overflow="hidden" bg="white" px={{base:"3",sm:"6"}} py={{base:"5",sm:"7"}} w="100%">

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
            mr={{base:"2",sm:"6"}}
            ml="0"
            // src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <Box
          ml="30px"
          >
          <HStack align="flex-start" justify="space-between" mb="1.5">
            <VStack align="flex-start" >
              <Text fontSize="3xl" as="h2" fontWeight="400">
                {title}
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
              <HStack display={{base: "none", sm: "flex"}}>
                <Icon as={HiCash} fontSize="xl" color="gray.400" />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  <b>£{formattedSalary}</b> /yr
                </Text>
              </HStack>
              <HStack spacing="1" marginInlineStart={{base:"0 !important"}}>
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
          </Box>
        </Stack>

        <Box  
          position="absolute"
          bottom="0px"
          top="0px"
          right="0px"
          w="4px"
          bg="dyellow.200"
        />

      </Box>
      <Box position="absolute" bottom={{base:"unset", sm:"0"}} top={{base:"0", sm:"unset"}} right="0" zIndex={1} id="jobCardMenu">
        <Menu placement="left-start">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AiOutlinePlus />}
            variant="outline"
            size="lg"
          />
          <MenuList>
            <MenuItem as={Link} to={`/connect/jobs/${id}`} icon={<HiOutlineEye />} command="⌘T">
                View
            </MenuItem>
            <MenuItem as={Link} to={`/maker/jobs/edit?job=${id}`} icon={<HiOutlinePencil />} command="⌘N">
              Edit
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box  
        position="absolute"
        bottom="0px"
        top="0px"
        right="0px"
        w="4px"
        bg="dYellow.200"
      />
    </Box>
  )
}
