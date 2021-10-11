import { Box } from '@chakra-ui/react'
import * as React from 'react'
import {Link as GatsbyLink} from 'gatsby'

export const UnderlineLink = (props) => {
  const {link} = props

  return (
    <Box
      as={GatsbyLink}
      to={link}
      pos="relative"
      display="inline-block"
      transition="opacity 0.2s"
      _hover={{ opacity: 0.8 }}
      _after={{
        content: `""`,
        display: 'block',
        w: 'full',
        h: '2px',
        bottom: 0,
        bg: "red",
        insetX: 0,
        insetY: 0,
      }}
      {...props}
    />
  )
}
