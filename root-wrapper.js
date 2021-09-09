/**
 * External dependencies
 */
 import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client"
import { AnimatePresence } from "framer-motion"

// /**
//  * Internal dependencies
//  */
import { UseAppApolloClient } from './src/hooks';
import { AuthContextProvider } from './src/context';
import theme from "./src/@chakra-ui/gatsby-plugin/theme.js"

//global styles
import './src/css/global.css'
import './src/css/style.css'

//fonts
import "@fontsource/big-shoulders-display/100.css"
import "@fontsource/big-shoulders-display/300.css"
import "@fontsource/big-shoulders-display/500.css"
import "@fontsource/big-shoulders-display/600.css"
import "@fontsource/big-shoulders-display/900.css"
import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import Layout from './src/components/layout/Layout';

export const wrapPageElement = ({element}) => {

	const client = UseAppApolloClient();

	return (
		<AuthContextProvider>
			<ApolloProvider client={ client }> 
				<ChakraProvider theme={ theme } resetCSS>

						{element}

				</ChakraProvider>
			</ApolloProvider>
		</AuthContextProvider>
	)
}