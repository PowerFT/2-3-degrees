/**
 * Internal dependencies
 */
import React from "react"
import { navigate } from "gatsby"

/**
 * Internal dependencies
 */
 import { useAuth } from '../hooks';


const PrivateRoute = ({ component: Component, location, ...rest }) => {
  
	const { isLoggedIn } = useAuth()
	
	if (!isLoggedIn && location.pathname !== `/maker/login`) {
    navigate("/maker/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute