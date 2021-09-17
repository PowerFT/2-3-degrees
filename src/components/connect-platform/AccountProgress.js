import { Box, Button, Flex, HStack, LinkBox, LinkOverlay, Progress, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'


export const AccountProgress = ({completed, limit, complete, user, ...rest}) => {

  return (
    <Stack 
      spacing="4"
      as="section" 
      alignSelf="stretch" 
      direction={{base: "column", md: "row" }}
      align="center" 
      justify="center" 
      px={{base:"8", sm:"10", md:"24"}} 
      py="3" 
      bg="dOrange.300"
      display={complete ? "none" : "flex"}
      {...rest}
    >

      <LinkBox zIndex="100">
        <Box
        rounded="full"
        border="1px solid"
        overflow="hidden" 
        position="relative"
          size="sm" 
          _hover={{bg:"gray.50", color:"dOrange.300"}} 
          flex="1 1 50%" 
          maxW="md" 
          color="green.50" 
          rounded="full" 
          variant="outline"
          mb={{base: "1", md:"0"}}
        >
          <LinkOverlay as={Link} to={`/${user}/account`} my="2" mx="4" fontSize={{base:"xs"}}>For full features, complete your account</LinkOverlay>
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
        </Box>
      </LinkBox>

      {/* {user !== 'waiting' && (
        <Flex
          flex="1 0 50%"
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
           
      )}*/}
    </Stack>
    
  )
}