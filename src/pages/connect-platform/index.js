import React from "react"
import { Router } from "@reach/router"

import { ConnectJobs } from '../../components/connect-platform/ConnectJobsBoard'
import { ConnectPlatform } from '../../components/connect-platform'
import PrivateRoute from "../../components/PrivateRoute"

const NotFound = () => {
  if (typeof window !== 'undefined') {
    window.location = '/';
  }

  return null;
}
const ConnectPlatformPage = () => {

  // Hello {name}
  // User (maker) Profile Reminder + button
  // Maker: Post job button
  // Jobs Board button
  // latest job / filter buttons
  // latest private posts

  return (
    <>
      <Router basepath="/connect">
        <PrivateRoute path="/platform" component={ ConnectPlatform } />
        <ConnectJobs path="/jobs" component={ ConnectJobs } />
        <NotFound default />
      </Router>
    </>
  )
}

export default ConnectPlatformPage