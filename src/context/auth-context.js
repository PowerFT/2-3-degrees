/**
* External deps
*/

import React, { useContext, createContext } from 'react'

/**
* Internal deps
*/
import { useLocalStorage } from '../hooks'

const AuthContext = createContext({
	isloggedin: false,
	setisloggedin: () => null
})

export const useAuthContext = () => {
	return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {

	//this will store whether we are logged in or not in local storage.
	const [isloggedin, setisloggedin] = useLocalStorage(false)

	const contextValue = {
		isloggedin,
		setisloggedin
	}

	return(
		<AuthContext.Provider value = {contextValue}>
			{children}
		</AuthContext.Provider>
	)
}