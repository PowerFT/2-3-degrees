import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { Box, Stack, Text } from '@chakra-ui/react';

export const FooterMenuColumn = ({ id }) => {
  return (
    <Box>
      <StaticQuery
        query={FOOTER_MENU_QUERY}
        render={(data) => {
          console.log(data);
          if (data.wpMenu?.menuItems) {
            console.log(data.wpMenu?.menuItems);
            const menuItems = data.wpMenu?.menuItems?.nodes;

            return (
              <Box key={data.wpMenu.id}>
                <Text fontWeight="bold" mb="4">
                  {data.wpMenu.name}
                </Text>
                <Stack as="ul" listStyleType="none">
                  {menuItems?.map((link, idx) => (
                    <Box as="li" key={idx} mt="1" mb="0">
                      <Box
                        as={Link}
                        to={link.url}
                        _hover={{
                          textDecor: 'underline',
                        }}
                      >
                        {link.label}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            );
          }
        }}
      />
    </Box>
  );
};

const FOOTER_MENU_QUERY = graphql`
  query FooterMenuQuery($id: String) {
    wpMenu(id: { eq: $id }) {
      id
      name
      menuItems {
        nodes {
          label
          url
        }
      }
    }
  }
`;
