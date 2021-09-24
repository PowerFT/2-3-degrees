import { Box, Heading, Stack } from '@chakra-ui/react'
import * as React from 'react'

export const FieldGroup = (props) => {
  const { title, children, ...flexProps } = props
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      spacing="6"
      py="4"
      {...flexProps}
    >{title && (
      <Box minW="3xs">
        <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
          {title}
        </Heading>
      </Box>
      )}
      {children}
    </Stack>
  )
}
