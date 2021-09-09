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
      // display={allComplete && "none"}
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
        color="dBlue.500"
				
      >
        <Text as="dt" fontSize="sm" fontWeight="medium">
          {allComplete ? "Profile Completed!" : "Complete your account details to access all of the features"}
        </Text>
				{!allComplete && (
					<Stack direction="row" as="dd" mt="2" align="flex-end">
						<Box
							fontSize={{
								base: 'xl',
								lg: '2xl',
							}}
							as="span"
							fontWeight="bold"
							color="dBlue.500"
							lineHeight="1"
						>
							{completed} SECTIONS
						</Box>
						<Flex fontWeight="semibold" align="flex-end">
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
        size={allComplete ? "xs" : "sm"}
        colorScheme= {allComplete ? "green" : "dBlue"}
      />
    </Flex>
  )
}