import React from 'react';
import { Router } from '@reach/router';
import { TalentAccountSettings } from '../../components/user/account/talent';
// import MyJobs from "../../components/jobs/MyJobs"
import { SignIn } from '../../components/user/sign-in/talent';
import { SignUp } from '../../components/user/sign-up/talent';
import PrivateRoute from '../../components/PrivateRoute';
import TalentJobs from '../../components/talent-jobs';
import { ApplicationForm } from '../../components/jobs/applications/applications-form';
// import { Reset } from "../../components/user/reset/talent/Reset"
// import { ResetPassword } from "../../components/user/reset/talent/ResetPassword"

const NotFound = () => {
  if (typeof window !== 'undefined') {
    window.location = '/';
  }
  return null;
};
const TalentApp = () => {
  return (
    <>
      <Router basepath="/talent">
        <PrivateRoute
          path="/account"
          user="talent"
          component={TalentAccountSettings}
        />
        <PrivateRoute path="/jobs" component={TalentJobs} />
        <PrivateRoute path="/jobs/apply" component={ApplicationForm} />
        {/* <PrivateRoute path="/myjobs" component={ MyJobs } /> */}
        <SignIn path="/sign-in" user="talent" component={SignIn} />
        <SignUp path="/sign-up" user="talent" component={SignUp} />
        {/* <Reset path="/reset" user="talent" component={Reset}/> */}
        {/* <ResetPassword path="/reset-password" user="talent" component={ResetPassword}/> */}
        <NotFound default />
      </Router>
    </>
  );
};

export default TalentApp;
