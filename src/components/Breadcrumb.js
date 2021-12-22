import React from 'react';
import { Link } from 'gatsby';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const BreadCrumb = ({ current, previous, origin }) => {
  return (
    <Breadcrumb
      spacing="1"
      // w="fit-content"
      w="100%"
      mb="6"
      p="4"
      separator={<ChevronRightIcon color="gray.300" />}
      bg="red"
      size="xl"
    >
      {origin && (
        <BreadcrumbItem m="0">
          <BreadcrumbLink
            as={Link}
            bg="red"
            rounded="full"
            fontSize="md"
            py=".5"
            px="3"
            to={origin.link}
          >
            {origin.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {previous && (
        <BreadcrumbItem m="0">
          <BreadcrumbLink
            as={Link}
            to={previous.link}
            fontSize="md"
            bg="dOrange.300"
            rounded="full"
            py=".5"
            px="3"
          >
            {previous.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {current && (
        <BreadcrumbItem
          m="0"
          isCurrentPage
          bg="gray.600"
          rounded="full"
          py=".5"
          px="3"
        >
          <Text maxW="120px" fontSize="md" isTruncated>
            {current.name}
          </Text>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};
