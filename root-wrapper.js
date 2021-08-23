/**
 * External dependencies
 */
 import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client"
import Layout from './src/components/layout/Layout'

// import "./src/styles/global.css";
// /**
//  * Internal dependencies
//  */
import { UseAppApolloClient } from './src/hooks';
import { AuthContextProvider } from './src/context';
import { ExtendTheme } from './src/components/ExtendTheme'

//global styles
import './src/css/global.css'
import "@fontsource/big-shoulders-display/300.css"
import "@fontsource/big-shoulders-display/700.css"
import "@fontsource/big-shoulders-display/900.css"
// // // normalize CSS across browsers
// // import "./src/css/normalize.css"
// // // custom CSS styles
// // import "./src/css/style.css"
// // // custom Chakra Theme
// // import Theme from "./src/css/theme/index"

export const wrapPageElement = ({element}) => {

	const client = UseAppApolloClient();

	return (
		<AuthContextProvider>
			<ApolloProvider client={ client }> 
				<ChakraProvider theme={ ExtendTheme }>
					<Layout>
						{element}
					</Layout>
				</ChakraProvider>
			</ApolloProvider>
		</AuthContextProvider>
	)
}