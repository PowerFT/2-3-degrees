import { Avatar, Box, Collapse, Flex, HStack, useMenuButton } from '@chakra-ui/react'
import * as React from 'react'
import { HiSelector } from 'react-icons/hi'

export const AccountMenuButton = (props) => {
  const buttonProps = useMenuButton(props.menuopen)
	const { viewer, menuopen } = props
  return (
    <Flex
      as="button"
      {...buttonProps}
      w={menuopen ? "full" : "min-content"}
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.600"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      // transition="all 2s"
      _active={{
        bg: 'gray.600',
      }}
      _focus={{
        shadow: 'outline',
      }}
    >
      <HStack flex="1" spacing="3">
        <Avatar
          size="md"
          name={viewer.firstName && viewer.lastName ? `${viewer.firstName} ${viewer.lastName}` : '-'}
          // src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbiUyMHNpbWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100"
          alt="User profile image"
        />
        <Collapse in={menuopen}>
          <Box textAlign="start">
            <Box isTruncated fontWeight="semibold" color="gray.200">
              {viewer.firstName}
            </Box>
            <Box fontSize="xs" color="gray.400">
              {viewer.roles.nodes[0].name !== 'waiting' && (
                viewer.roles.nodes[0].name === 'maker' ?
                  "Opportunity Maker" :
                  "Me, Talent"
              )}
            </Box>
          </Box>
        </Collapse>        
      </HStack>
      {menuopen && (
        <Box fontSize="lg" color="gray.400">
          <HiSelector />
        </Box>
      )}
    </Flex>
  )
}