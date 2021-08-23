import { Box, Flex, Progress, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'


export const AccountCompletedCard = ({completed, limit, ...rest}) => {

	const allComplete = completed === limit

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
			{...rest}
    >
      <Box id="accountCompletedCard" srOnly>
        {completed} out of {limit} of account setup
      </Box>
      <Box
        flex="1"
        as="dl"
        px={{
          base: '2',
          lg: '4',
        }}
        py="2"
        color={mode('gray.500', 'gray.400')}
				
      >
        <Text as="dt" fontSize="sm" fontWeight="medium">
          {allComplete ? "Profile Completed!" : "Profile Completion"}
        </Text>
				{!allComplete && (
					<Stack direction="row" as="dd" mt="2" align="flex-end">
						<Box
							fontSize={{
								base: '2xl',
								lg: '3xl',
							}}
							as="span"
							fontWeight="bold"
							color={mode('gray.800', 'white')}
							lineHeight="1"
						>
							{completed} sections
						</Box>
						<Flex fontWeight="semibold">
							<Box as="span" aria-hidden>
								/
							</Box>
							<Box srOnly>out of</Box>
							<Text ps="1">{limit}</Text>
						</Flex>
					</Stack>
				)}

      </Box>
      <Progress
        aria-labelledby="accountCompletedCard"
        value={completed}
        max={limit}
        min={0}
        size={allComplete ? "xs" : "lg"}
        colorScheme= {allComplete ? "green" : "blue"}
      />
    </Flex>
  )
}