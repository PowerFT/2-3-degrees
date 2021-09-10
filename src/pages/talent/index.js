import React from "react"
import { Router } from "@reach/router"
// import Profile from "../../components/user/Profile"
import { AccountSettings } from "../../components/user/account/talent"
import MyJobs from "../../components/jobs/MyJobs"
import { SignIn } from "../../components/user/sign-in/talent"
import { SignUp } from "../../components/user/sign-up/talent"
// import { Hello } from "../../components/user/hello"

// import Default from "../../components/Default"
import PrivateRoute from "../../components/PrivateRoute"

const NotFound = () => {
  if (typeof window !== 'undefined') {
    window.location = '/';
  }

  return null;
}
const TalentApp = () => {
  return (
    <>
      <Router basepath="/talent">
        <PrivateRoute path="/account" user="talent" component={AccountSettings} />
        <PrivateRoute path="/myjobs" component={ MyJobs } />
        <SignIn path="/sign-in" user="talent" component={SignIn} />
				<SignUp path="/sign-up" user="talent" component={SignUp}/>
        <NotFound default />
      </Router>
    </>
  )
}

export default TalentApp