import {
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiCash, HiClock, HiLocationMarker } from 'react-icons/hi';

export const JobPreviewCard = ({ formDeets }) => {
  const {
    title,
    jobLocation,
    salary,
    jobType,
    sector,
    companyName,
    salaryStructures,
  } = formDeets;
  const formattedSalary = parseInt(salary)?.toLocaleString();
  return (
    <Box position="relative" rounded="md" bg="gray.50" w="100%">
      <VStack p="3" spacing="1" align="flex-start">
        <Avatar size="md" name={companyName} />
        <Text fontSize="3xl" as="h2" fontWeight="400" color="gray.800">
          {title}
        </Text>
        <Text as="h3" fontSize="2xl" color="gray.800">
          {companyName}
        </Text>
        <Text
          as="h3"
          fontSize="lg"
          textTransform="uppercase"
          color="gray.600"
          letterSpacing="normal"
        >
          {sector}
        </Text>
        <HStack spacing="1">
          <Icon as={HiCash} fontSize="xl" color="gray.400" />
          <Text
            fontSize="sm"
            // fontWeight="medium"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {salary && `£${formattedSalary}`} /{' '}
            {salaryStructures?.toLocaleLowerCase()}
          </Text>
        </HStack>
        <HStack spacing="1">
          <Icon as={HiClock} color="gray.400" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
            {jobType}
          </Text>
        </HStack>
        <HStack spacing="1">
          <Icon as={HiLocationMarker} color="gray.400" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
            {jobLocation}
          </Text>
        </HStack>
        <Box
          position="absolute"
          bottom="0px"
          top="0px"
          right="0px"
          w="4px"
          bg="dYellow.200"
        />
      </VStack>
    </Box>
  );
};
