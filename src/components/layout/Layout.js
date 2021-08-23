/**
* External dependencies
*/
import React from 'react';
import { Flex } from '@chakra-ui/react'
/**
* Internal dependencies
*/
// import SiteMenu from "./SiteMenu";
import { MobileBottomBar } from './MobileBottomBar'
import { Sidebar } from './Sidebar'
import { useAuth } from '../../hooks'
import { graphql, useStaticQuery } from 'gatsby';

export default function Layout({ children }) {

  const { isLoggedIn } = useAuth()

const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
)

  return (
      <Flex
        h="100vh" 
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
      >
        <Flex className="site__content" flex="1" overflow="hidden">
          <Sidebar
            // sitetitle={data.site.siteMetadata.title}
            // isloggedIn={isLoggedIn}
            name="joe"
            display={{
              base: 'none',
              md: 'flex',
            }}
          />
          {children}
        </Flex>
        <MobileBottomBar isLoggedIn={isLoggedIn}/>
      </Flex>
  );
}
