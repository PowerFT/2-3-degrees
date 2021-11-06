import { VStack, Text, Box, Stack } from '@chakra-ui/react';
import * as React from 'react';

export const AdminBlob = (props) => {
  const { title, children, ...flexProps } = props;
  return (
    <VStack
      bg="white"
      rounded="md"
      borderWidth="1px"
      borderColor="gray.800"
      w={{ base: 'xs', sm: 'md', md: 'sm', lg: 'lg' }}
      spacing="3"
      p="6"
      align="flex-start"
      position="relative"
      overflow="hidden"
      {...flexProps}
    >
      {title && (
        <Box
          position="absolute"
          top="0"
          right="0"
          left="0"
          bg="gray.800"
          color="gray.50"
          py="1"
        >
          <Text
            as="h4"
            textAlign="center"
            color="inherit"
            fontSize="xs"
            fontWeight="500"
          >
            {title}
          </Text>
        </Box>
      )}
      <Stack w="100%">{children}</Stack>
    </VStack>
  );
};
