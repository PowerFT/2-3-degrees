import { Box, LinkBox, LinkOverlay, Progress, Stack } from '@chakra-ui/react';
import { Link } from 'gatsby';
import * as React from 'react';

export const AccountProgress = ({
  completed,
  limit,
  complete,
  user,
  ...rest
}) => {
  return (
    <Stack
      spacing="4"
      as="section"
      alignSelf="stretch"
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      px={{ base: '8', sm: '10', md: '24' }}
      py="6"
      bg="dOrange.300"
      display={complete ? 'none' : 'flex'}
      {...rest}
    >
      <LinkBox zIndex="100">
        <Box
          rounded="full"
          border="2px solid"
          overflow="hidden"
          position="relative"
          size="xl"
          _hover={{ bg: 'gray.50', color: 'dOrange.300' }}
          flex="1 1 50%"
          maxW="lg"
          color="green.50"
          rounded="full"
          variant="outline"
          mb={{ base: '1', md: '0' }}
        >
          <LinkOverlay
            as={Link}
            to={`/${user}/account`}
            my="3"
            mx="6"
            fontWeight="500"
            fontSize={{ base: 'sm' }}
          >
            For full features, complete your account
          </LinkOverlay>
          <Progress
            aria-labelledby="accountCompletedCard"
            value={completed}
            max={limit}
            min={0}
            size="sm"
            colorScheme="green"
            isAnimated
            hasStripe
          />
        </Box>
      </LinkBox>
    </Stack>
  );
};
