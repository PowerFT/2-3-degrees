import React from "react"
import { Router } from "@reach/router"

import { ConnectJobs } from '../../components/connect-platform/ConnectJobsBoard'
import { ConnectPlatform } from '../../components/connect-platform'
import PrivateRoute from "../../components/PrivateRoute"

const ConnectPlatformPage = () => {

  // Hello {name}
  // User (maker) Profile Reminder + button
  // Maker: Post job button
  // Jobs Board button
  // latest job / filter buttons
  // latest private posts

  return (
    <>
      <Router basepath="/connect-platform">
        <PrivateRoute path="/" component={ ConnectPlatform } />
        <ConnectJobs path="/jobs" component={ ConnectJobs } />
      </Router>
    </>
  )
}

export default ConnectPlatformPage