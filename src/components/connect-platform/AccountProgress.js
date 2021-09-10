import { Box, Button, Flex, HStack, LinkBox, LinkOverlay, Progress, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'


export const AccountProgress = ({completed, limit, complete, user, ...rest}) => {

  return (
    <Stack spacing="4" as="section" alignSelf="stretch" direction="row" align="center" justify="center" px={{base:"8", sm:"10", md:"24"}} py="3" bg="dOrange.300" wrap="wrap">

      <LinkBox>
        <Button 
          size="sm" 
          _hover={{bg:"gray.50", color:"dOrange.300"}} 
          flex="1 1 50%" 
          maxW="md" 
          color="green.50" 
          rounded="full" 
          variant="outline"
        >
          <LinkOverlay as={Link} to={`/${user}/account`}>Unlock the Connect Platform, complete account</LinkOverlay>
        </Button>
      </LinkBox>

      <Flex
        flex="1 1 50%"
        direction="column"
        bg={mode('white', 'gray.700')}
        rounded="md"
        overflow="hidden"
        // shadow="base"
        maxW="sm"
        // display={complete && "none"}
        {...rest}
      >
        <Box srOnly>
          {completed} out of {limit} of account setup
        </Box>
        <Box
          flex="1"
          px={{
            base: '1',
            lg: '3',
          }}
          py="0"
        >
          {!complete && (
            <HStack align="flex-end"
              fontSize={{
                base: 'lg',
                lg: 'xl',
              }}
              fontWeight="bold"
              color="gray.800"
              lineHeight="1"
            >
              <Text fontSize="lg" fontWeight="700">{`${completed} SECTION`}</Text>
              <Text fontSize="md">/ {limit}</Text>
              <Box srOnly>{`${completed} out of ${limit}`}</Box>
            </HStack>
          )}
        </Box>
        <Progress
          aria-labelledby="accountCompletedCard"
          value={completed}
          max={limit}
          min={0}
          size="sm"
          colorScheme= "green"
          isAnimated
          hasStripe
        />
      </Flex>

    </Stack>
    
  )
}