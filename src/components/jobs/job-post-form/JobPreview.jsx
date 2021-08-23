import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  Badge,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiCash, HiLocationMarker } from 'react-icons/hi'


export const JobPreviewCard = ({ title, jobLocation, salary, jobType, sector, companyName, content }) => {

  const formattedSalary = parseInt(salary).toLocaleString()

  return (
    <Box
      id="previewCard"
      maxW="xl"
      w="sm"
      mx="auto"
      bg={useColorModeValue('white', 'gray.700')}
      rounded={{
        md: 'xl',
      }}
      padding="6"
      shadow={{
        md: 'base',
      }}
      px={{
        base: '6',
        md: '4',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          md: 'row',
        }}
        spacing={{
          base: '3',
          md: '10',
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
        <Box>
          <Stack
            spacing={{
              base: '1',
              md: '2',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}
          >
            <Text as="h2" fontWeight="bold" fontSize="xl">
              {companyName}
            </Text>
            <HStack
              fontSize={{
                base: 'md',
                md: 'lg',
              }}
            >
              <Text as="span" color={useColorModeValue('gray.500', 'gray.300')} lineHeight="1">
                {sector}
              </Text>
              <Badge
                display="flex"
                alignItems="center"
                borderRadius="full"
                px="2"
                colorScheme="green"
                variant="outline"
              >
                Preview
              </Badge>
            </HStack>
          </Stack>
          <Text mt="2">{title}</Text>
          <Wrap shouldWrapChildren my="2" spacing="2">
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

          </Wrap>
          <Box fontSize="sm" noOfLines={2}>
            {content}
          </Box>
        </Box>

        {/* <Avatar
          size="xl"
          src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY5fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          name="Melinda Paul"
          justifySelf="flex-end"
        /> */}
      </Stack>

    </Box>
  )
}
