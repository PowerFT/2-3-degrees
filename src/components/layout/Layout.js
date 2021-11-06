/**
* External dependencies
*/
import React from 'react';
import { Flex, Link } from '@chakra-ui/react'
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

  const { isloggedin } = useAuth()

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
          
          <MobileBottomBar isloggedin={isloggedin}/>
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="gatsby-gdpr-google-analytics"
            enableDeclineButton={true}
            style={{ background: "#2B373B", paddingBottom:"8vh", zIndex:"32", maxWidth:"350px", left:"unset", right: "0", zIndex:"5000"}}
            buttonStyle={{ marginTop:"0" }}
            declineButtonStyle={{marginTop:"0"}}
          >
            This site uses cookies. Read our <a href="/privacy">Privacy-policy</a>...
          </CookieConsent>

      </Box>
      
    </>
  );
}
