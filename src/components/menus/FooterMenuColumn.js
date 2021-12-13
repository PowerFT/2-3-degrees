import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import { Box, Stack, Text } from '@chakra-ui/react';

const FOOTER_MENU_QUERY = gql`
  query FooterMenuQuery($id: ID!) {
    menu(id: $id) {
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

export const FooterMenuColumn = ({ id, ...rest }) => {
  const { data, loading, error } = useQuery(FOOTER_MENU_QUERY, {
    variables: {
      id,
    },
  });
  console.log(id);

  if (error) console.log(error);
  if (!data || loading) return null;
  if (data) console.log(data, id);

  console.log(data, id);
  // if (data.menu?.menuItems) {
  //   console.log(data.menu?.menuItems);
  const menuItems = data.menu?.menuItems?.nodes;

  return menuItems ? (
    <Box key={data.menu.id} {...rest}>
      <Text fontWeight="bold" mb="4">
        {data.menu.name}
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
  ) : (
    <></>
  );
};
