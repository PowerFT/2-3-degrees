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
	
	if (!isLoggedIn && location.pathname !== `/maker/sign-in`) {
    navigate("/maker/sign-in")
    return null
  }
  if (!isLoggedIn && location.pathname !== `/talent/sign-in`) {
    navigate("/talent/sign-in")
    return null
  }
  if (!isLoggedIn && location.pathname !== `/connect/*`) {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute