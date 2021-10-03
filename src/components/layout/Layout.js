/**
* External dependencies
*/
import React from 'react';
import { Flex } from '@chakra-ui/react'
// import { graphql, useStaticQuery } from 'gatsby';
import { Box } from "@chakra-ui/react"
// import { motion } from "framer-motion"
// import { AnimatePresence } from "framer-motion"
import CookieConsent from "react-cookie-consent";

/**
* Internal dependencies
*/
// import SiteMenu from "./SiteMenu";
import { MobileBottomBar } from './MobileBottomBar'
import { Sidebar } from './Sidebar'
import { useAuth } from '../../hooks'
import { Content } from './Content';
import { Footer } from '../footer';
// import "@wordpress/block-library/build-style/style.css"

// const MotionBox = motion(Box)

export default function Layout({children}) {

  // console.log(children)

  const { isLoggedIn } = useAuth()

  // const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `
  // )

  return (
    <>
      <Box
        className="site"
        w="100vw"
        minH="100vh"
        position="relative"
      >
        <Flex className="site__container" width="100%" bg="gray.50">
          <Sidebar
            display={{
              base: 'none',
              sm: 'flex',
            }}
          />
          {/* <Header />
          <InnerSidebar /> */}
          <Box flex="1">
            {children}
            <Footer />
          </Box>
        </Flex>

        <MobileBottomBar isLoggedIn={isLoggedIn}/>

      </Box>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
        enableDeclineButton={true}
      >
      This site uses cookies ...
      </CookieConsent>
    </>
  );
}
