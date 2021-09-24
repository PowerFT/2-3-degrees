import {
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Link } from 'gatsby'
import * as React from 'react'
// import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from '../layout/Logo'
import { SocialButton } from './SocialButton'
import { footerLinks, links, socialLinks } from './_data'
 
export const Footer = () => (
  <Box as="footer" bg="dOrange.400" color="white" py="64px">
    <Box maxW="7xl" px="8" mx="auto">
      <Flex
        direction={{
          base: 'column',
          lg: 'row',
        }}
        justify="space-between"
        pb="8"
        align="flex-start"
        id="top"
      >
        <Box
          paddingEnd="12"
          mb={{
            base: '10',
            lg: 0,
          }}
        >
          <Logo iconColor="white" h="16" />
          <HStack spacing="4" mt="8" as="ul">
            {socialLinks?.map((link, i) => (
              <SocialButton key={i} target="_blank" rel="noreferrer" href={link.href}>
                <Box srOnly>{link.label}</Box>
                {link.icon}
              </SocialButton>
            ))}
          </HStack>
        </Box>
        <SimpleGrid
          w="full"
          maxW={{
            base: 'unset',
            lg: '2xl',
          }}
          columns={{
            base: 2,
            lg: 4,
          }}
          spacing={{
            base: '8',
            md: '4',
          }}
          fontSize="sm"
        >
          {links?.map((group, idx) => (
            <Box key={idx}>
              <Text fontWeight="bold" mb="4">
                {group.title}
              </Text>
              <Stack as="ul" listStyleType="none">
                {group.links?.map((link, idx) => (
                  <Box as="li" key={idx}>
                    <Box
                      as="a"
                      href={link.href}
                      _hover={{
                        textDecor: 'underline',
                      }}
                    >
                      {link.label}
                      {link.badge && (
                        <Box as="span" marginStart="2">
                          {link.badge}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
      <Divider my="10" borderColor="dYellow.300" />
      <Flex
        direction={{
          base: 'column-reverse',
          lg: 'row',
        }}
        align={{
          base: 'flex-start',
          lg: 'center',
        }}
        justify="space-between"
        fontSize="sm"
      >
        <Wrap
          id="bottom"
          spacing={{
            base: '4',
            lg: '8',
          }}
          mt={{
            base: '4',
            lg: '0',
          }}
        >
          <WrapItem>
            <Box>&copy; 2-3 Degrees</Box>
          </WrapItem>
          {footerLinks?.map((link, idx) => (
            <WrapItem key={idx}>
              <Box as={Link} to={link.href}>
                {link.label}
              </Box>
            </WrapItem>
          ))}
        </Wrap>
        {/* <LanguageSwitcher /> */}
      </Flex>
    </Box>
  </Box>
)
