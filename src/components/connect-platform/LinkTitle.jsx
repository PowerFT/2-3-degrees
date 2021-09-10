import { HStack, Icon, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'
import { HiOutlineArrowCircleRight } from 'react-icons/hi'

export const LinkTitle = (props) => {
  const { title, children, link } = props
  return (
    <LinkBox>
      <Stack mt="2">
        <LinkOverlay as={Link} to={link} color='#4c907f' _hover={{ color: "red" }}>
          <HStack align="center">
            <Text as="h4" fontSize="lg" fontWeight="bold" >
              {title} <Icon w="6" h="6" as={HiOutlineArrowCircleRight} />
            </Text>
          </HStack>
        </LinkOverlay>

        <Text paddingEnd="6" fontSize="sm">
          {children}
        </Text>
      </Stack>
    </LinkBox>
  )
}
