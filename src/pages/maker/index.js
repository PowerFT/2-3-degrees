import React from "react"
import { Router } from "@reach/router"
// import Profile from "../../components/user/Profile"
import { AccountSettings } from "../../components/user/account/maker"
import MyJobs from "../../components/jobs/MyJobs"
import { CreateJobPostFormPage } from "../../components/jobs/job-post-form/CreateJobPostFormPage"
import { UpdateJobPostFormPage } from "../../components/jobs/job-post-form/UpdateJobPostPage"
import { SignIn } from "../../components/user/sign-in/maker"
import { SignUp } from "../../components/user/sign-up/maker"
// import { Hello } from "../../components/user/hello"

// import Default from "../../components/Default"
import PrivateRoute from "../../components/PrivateRoute"

const MakerApp = () => {
  return (
    <>
      <Router basepath="/maker">
        <PrivateRoute path="/account" component={AccountSettings} />
        <PrivateRoute path="/jobs" component={MyJobs} />
        <PrivateRoute path="/jobs/post" component={CreateJobPostFormPage} />
        <PrivateRoute path="/jobs/edit" component={UpdateJobPostFormPage} />
        <SignIn path="/" user="maker" component={SignIn} />
        <SignUp path="/sign-up" user="maker" component={SignUp} />
      </Router>
    </>
  )
}

export default MakerApp