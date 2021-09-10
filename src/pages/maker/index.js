import React from "react"
import { Router } from "@reach/router"
import { AccountSettings } from "../../components/user/account/maker"
import MyJobs from "../../components/jobs/MyJobs"
import { CreateJobPostFormPage } from "../../components/jobs/job-post-form/CreateJobPostFormPage"
import { UpdateJobPostFormPage } from "../../components/jobs/job-post-form/UpdateJobPostPage"
import { SignIn } from "../../components/user/sign-in/maker"
import { SignUp } from "../../components/user/sign-up/maker"
import PrivateRoute from "../../components/PrivateRoute"

const NotFound = () => {
  if (typeof window !== 'undefined') {
    window.location = '/';
  }

  return null;
}

const MakerApp = () => {

  return (
    <>
      <Router basepath="/maker">
        <PrivateRoute path="/account" user="maker" component={AccountSettings} />
        <PrivateRoute path="/jobs" component={MyJobs} />
        <PrivateRoute path="/jobs/post" component={CreateJobPostFormPage} />
        <PrivateRoute path="/jobs/edit" component={UpdateJobPostFormPage} />
        <SignIn path="/sign-in" user="maker" component={SignIn} />
        <SignUp path="/sign-up" user="maker" component={SignUp} />
        <NotFound default />
      </Router>
    </>
  )
}

export default MakerApp