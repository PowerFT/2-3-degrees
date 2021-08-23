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

const TalentApp = () => {
  return (
    <>
      <Router basepath="/talent">
        <PrivateRoute path="/account" component={AccountSettings} />
        <PrivateRoute path="/myjobs" component={ MyJobs } />
        <SignIn path="/" user="talent" component={SignIn} />
				<SignUp path="/sign-up" user="talent" component={SignUp}/>
      </Router>
    </>
  )
}

export default TalentApp