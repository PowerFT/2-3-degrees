import { chakra } from '@chakra-ui/react'

export const SocialButton = chakra('a', {
  baseStyle: {
    rounded: 'lg',
    w: '10',
    h: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'blackAlpha.200',
    color: 'white',
    transition: 'all 0.2s',
    _hover: {
      bg: 'blackAlpha.600',
    },
  },
})
