import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { graphql, Link, StaticQuery } from 'gatsby';
import { Box, Stack, Text } from '@chakra-ui/react';

export const FooterMenuColumn = ({ id, ...rest }) => {
  // const { data, loading, error } = useQuery(FOOTER_MENU_QUERY, {
  //   variables: {
  //     id: id,
  //   },
  // });
  // console.log(id);

  // if (error) console.log(error);
  // if (!data || loading) return null;
  // if (data) console.log(data, id);

  // // console.log(data, id);
  // // if (data.menu?.menuItems) {
  // //   console.log(data.menu?.menuItems);
  // const menuItems = data.menu?.menuItems?.nodes;

  return (
    <StaticQuery
      query={FOOTER_MENU_QUERY}
      render={(data) => {
        if (data.wpMenu) {
          const menuItems = data.menu?.menuItems?.nodes;

          return (
            <>
              {menuItems ? (
                <Box key={data.menu.id} {...rest}>
                  <Text fontWeight="bold" mb="4">
                    {data.menu.name}
                  </Text>
                  <Stack as="ul" listStyleType="none">
                    {menuItems?.map((link, idx) => (
                      <Box as="li" key={idx} mt="1" mb="0">
                        <Box
                          as={Link}
                          to={link.path}
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
              )}
            </>
          );
        }
      }}
    />
  );
};

//   return menuItems ? (
//     <Box key={data.menu.id} {...rest}>
//       <Text fontWeight="bold" mb="4">
//         {data.menu.name}
//       </Text>
//       <Stack as="ul" listStyleType="none">
//         {menuItems?.map((link, idx) => (
//           <Box as="li" key={idx} mt="1" mb="0">
//             <Box
//               as={Link}
//               to={link.path}
//               _hover={{
//                 textDecor: 'underline',
//               }}
//             >
//               {link.label}
//             </Box>
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   ) : (
//     <></>
//   );
// };

const FOOTER_MENU_QUERY = graphql`
  query FooterMenuQuery($id: String!) {
    wpMenu(id: { eq: $id }) {
      id
      name
      menuItems {
        nodes {
          label
          path
        }
      }
    }
  }
`;
