import {
  Box,
  Divider,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
// import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from '../layout/Logo';
import { SocialButton } from './SocialButton';
import { footerLinks, links, socialLinks } from './_data';
import { FooterMenuColumn } from '../menus/FooterMenuColumn';

export const Footer = () => (
  <Box as="footer" bg="gray.500" color="white" py="64px">
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
          <LinkBox h="16" w="16">
            <LinkOverlay as={Link} to="/">
              <StaticImage
                src="../../images/oldLogo.png"
                alt="logo"
                // height={400}
                fit="cover"
                imgStyle={{ height: '100%', width: 'auto' }}
                style={{ height: '100%', width: 'auto' }}
              />
            </LinkOverlay>
          </LinkBox>
          <HStack spacing="4" mt="8" as="ul">
            {socialLinks?.map((link, i) => (
              <SocialButton
                key={i}
                target="_blank"
                rel="noreferrer"
                href={link.href}
              >
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
          <FooterMenuColumn
            id={process.env.GATSBY_WORDPRESS_FOOTER_ORGANISATION_ID}
            className="organisation-footer-menu"
          />
          <FooterMenuColumn
            id={process.env.GATSBY_WORDPRESS_FOOTER_RESOURCES_ID}
            className="resources-footer-menu"
          />
          <FooterMenuColumn
            id={process.env.GATSBY_WORDPRESS_FOOTER_SERVICES_ID}
            className="services-footer-menu"
          />
          <FooterMenuColumn
            id={process.env.GATSBY_WORDPRESS_FOOTER_CONTACT_ID}
            className="contact-footer-menu"
          />

          {/* {links?.map((group, idx) => (
            <Box key={idx}>
              <Text fontWeight="bold" mb="4">
                {group.title}
              </Text>


              <Stack as="ul" listStyleType="none">


                {group.links?.map((link, idx) => (
                  <Box as="li" key={idx} mt="1" mb="0">
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
          ))} */}
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
        <WrapItem>
          <Box>
            <a href="mailto: info@2-3degrees.com">info@2-3degrees.com</a>
          </Box>
        </WrapItem>
        {/* <LanguageSwitcher /> */}
      </Flex>
    </Box>
  </Box>
);
